/**
 * Certificate.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cer_file:{
      type:'string'
    },
    key_file:{
      type:'string'
    },
    serial_number:{
      type:'string'
    },
    expiration_date:{
      type:'string'
    },
    password:{
      type:'string'
    },
    owner:{
      model:'user'
    }
  },
  beforeCreate: function(values, next){
    certificateUtils.findSerialNumber(values.cer_file).then((serial_number)=>{
      values.serial_number = serial_number;
      certificateUtils.findExpirationData(values.cer_file).then((expiration_date)=>{
      values.expiration_date = expiration_date;
      next();
    }).catch((err) => next(err));
    }).catch((err) => next(err));

  },
  afterDestroy:function(destroyRecord, next){
    sails.log(destroyRecord);
    certificateUtils.deleteFile(destroyRecord.cer_file).then((msg) => {
      certificateUtils.deleteFile(destroyRecord.key_file).then((msg) => {
        next();
      }).catch((err) => next(err));
    }).catch((err) => next(err));
  }
};


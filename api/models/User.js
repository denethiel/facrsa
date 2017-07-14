/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    email:{
      type:'email',
      required:true,
      unique:true
    },
    encryptedPassword:{
      type:'string'
    },
    rfc:{
      type:'string'
    },
    name:{
      type:'string'
    },
    address:{
      model:'address'
    },
    telephone:{
      type:'integer'
    },
    fax:{
      type:'string'
    },
    web:{
      type:'string'
    },
    gln:{
      type:'string'
    },
    admin:
    {
      type:'boolean'
    },
    certificates:{
      collection:'certificate',
      via:'owner'
    },
    toJSON: function(){
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }

  },
  beforeCreate: function(values, next){
    bcrypt.genSalt(10, function(err, salt){
      if(err) return next(err);
      bcrypt.hash(values.password,salt,function(err, hash){
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },
  validPassword: function(password, user, cb){
    bcrypt.compare(password, user.encryptedPassword, function(err, match){
      if(err) cb(err);
      if(match){
        cb(null,true);
      }else{
        cb(err);
      }
    })
  },
  updateAddress:function(parameters,addressId, cb){
    Address.update({id:addressId},{
        street: parameters.street,
        num_ext: parameters.num_ext,
        num_int: parameters.num_int,
        colony: parameters.colony,
        postal_code: parseInt(parameters.postal_code),
        location: parameters.location,
        city: parameters.city,
        state: parameters.state,
        country: parameters.country,
        reference: parameters.reference
      }).exec(function(err, address){
        if(err){cb(err)}
        User.findOne({id: parameters.id}).populate('address').exec(function(err, user){
          cb(null, user);
        })

      })
  },
  addAddress:function(parameters, cb){
    Address.create({
        street: parameters.street,
        num_ext:parameters.num_ext,
        num_int: parameters.num_int,
        colony: parameters.colony,
        postal_code: parseInt(parameters.postal_code),
        location: parameters.location,
        city: parameters.city,
        state: parameters.state,
        country: parameters.country,
        reference: parameters.reference
        }).exec(function(err, address){
          if(address){
            User.update({id: parameters.id},{address: address.id}).exec(function(err, updated){
              User.findOne({id: parameters.id}).populate('address').exec(function(err, user){
                cb(null, user);
              })
            })
          }else{
            cb(err);
          }
        })
  },
};


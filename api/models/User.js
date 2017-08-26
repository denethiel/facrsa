/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email:{
      type:'string',
      isEmail: true,
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
      type:'string',
      allowNull:true,
    },
    web:{
      type:'string',
      allowNull:true
    },
    gln:{
      type:'string',
      allowNull:true
    },
    admin:
    {
      type:'boolean',
      defaultsTo:false
    },
    certificates:{
      collection:'certificate',
      via:'owner'
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
  customToJSON:function(){
    return _.omit(this,['encryptedPassword']);
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
      }).exec(function(err){
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
            User.addToCollection(parameters.id,'address').members([address.id]).exec(function(err){
              if(err){cb(err)}
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


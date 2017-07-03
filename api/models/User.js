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
  }
};


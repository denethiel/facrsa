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
    password:{
      type:'string'
    }
    owner:{
      model:'user'
    }
  }
};


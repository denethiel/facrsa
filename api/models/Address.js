/**
 * Address.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    street:{
      type:'string',
      required:true
    },
    num_ext:{
      type:'string',
    },
    num_int:{
      type:'string',
    },
    colony:{
      type:'string'
    },
    postal_code:{
      type:'integer'
    },
    location:{
      type:'string'
    },
    city:{
      type:'string',
      required:true
    },
    state:{
      type:'string',
      required:true
    },
    country:{
      type:'string',
      required:true
    },
    reference:{
      type:'string'
    }

  }
};


/**
 * Branch.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    alias:{
      type:'string'
    },
    certificate:{
      model:'certificate',
    },
    address:{
      model:'address',
    }
  }
};


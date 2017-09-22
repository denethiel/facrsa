//var lineReader = require('line-reader');
var path = require('path');
importProdKey = function(){
  var deferred = new Promise(function(resolve, reject){
    ClaveProducto.count({}).exec(function(err, numRecord){


    })
  })
  return deferred;
}


function isNumeric(n){
  return (typeof n == "number" && !isNaN(n));
}



module.exports = {
  importProdKey : importProdKey
}

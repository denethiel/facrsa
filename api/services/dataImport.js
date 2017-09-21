//var lineReader = require('line-reader');
var path = require('path');
importProdKey = function(){
  var deferred = new Promise(function(resolve, reject){
    ClaveProducto.count({}).exec(function(err, numRecord){
      sails.log("Registros encontrados: " + numRecord);
      if(numRecord === 0){
        var base = path.resolve('.');
        var file = base + '/api/data/claveProdServ.csv';
        sails.log(file);
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(file)
        });
        lineReader.on('line',function(line){
          var datos = line.split(',');
          sails.log(datos[0],datos[1]);
        })
        resolve();
      }else{
        resolve();
      }
    })
  })
  return deferred;
}




module.exports = {
  importProdKey : importProdKey
}

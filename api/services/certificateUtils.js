var shell = require('shelljs');
var Promise = require('promise');
var fs = require('fs');

findSerialNumber = function(cerFile){
  var deferred = new Promise(function(resolve, reject){
    if(cerFile.includes(".cer")){
      var raw = shell.exec('openssl x509 -inform DER -in "'+cerFile+'" -noout -serial',{silent: true}).stdout;
      sails.log(raw);
      var wildSerialNumber = raw.split("=")[1];
      var numbers = wildSerialNumber.split("");
      var pair = false, serialNumber = "";

      numbers.map(function(num){
        if(pair){
          serialNumber += num;
          pair = false;
        }else{
          pair = true;
        }
      })
      sails.log(serialNumber);
      resolve(serialNumber);
    }else{
      reject("Error: .Cer File not provided");
    }

  })
  return deferred;
}

findExpirationData = function(cerFile){
  var deferred = new Promise(function(resolve, reject){
    if(cerFile.includes(".cer")){
      let raw = shell.exec('openssl x509 -inform DER -in "'+cerFile+'" -noout -enddate',{silent:true}).stdout;
      var expirationDate = raw.split("=")[1];
      resolve(expirationDate);
    }else{
      reject("Error: .cer file not provided");
    }
  })
  return deferred;
}

deleteFile = function(pathFile){
  sails.log(pathFile);
  var deferred = new Promise(function(resolve, reject){
    fs.unlink(pathFile, function(err){
      if(err){reject(err);}
      resolve("Archivo eliminado correctamente");
    })
  })
  return deferred;
}

module.exports = {
  findSerialNumber: findSerialNumber,
  findExpirationData: findExpirationData,
  deleteFile: deleteFile
}

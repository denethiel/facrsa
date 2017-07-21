var shell = require('shelljs');
var Promise = require('promise');

findSerialNumber = function(cerFile){
  var deferred = new Promise((resolve, reject){
    if(cerFile.includes(".cer")){
      var raw = exec('openssl x509 -inform DER -in "'+cerFile+'" -noout -serial',{silent: true}).stdout;
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
  var deferred = new Promise((resolve, reject){
    if(cerFile.includes(".cer")){
      var expirationDate = exec('openssl x509 -inform DER -in "'+cerFIle+'" -noout -enddate',{silent:true}).stdout;
      resolve(expirationDate);
    }else{
      reject("Error: .cer file not provided");
    }

  })
}

module.exports = {
  findSerialNumber: findSerialNumber,
  findExpirationData: findExpirationData
}

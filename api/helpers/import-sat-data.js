var path = require('path');

module.exports = {


  friendlyName: 'Llenador de Datos del SAT',


  description: 'Helper para llenar datos proveidos por el SAT en la DB',


  inputs: {
    // dataName:{
    //   type:'string',
    //   description:'Nombre de los datos a importar',
    //   required:true
    // }
  },


  exits: {

  },


  fn: function (inputs, exits) {




    ClaveProducto.count({}).exec(function(err, numRecord){
      sails.log("Registros encontrados: " + numRecord);
      var msg;
      if(numRecord === 0){
        var base = path.resolve('.');
        var file = base + '/api/data/claveProdServ.csv';
        var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(file)
        });
        lineReader.on('line',function(line){
          var datos = line.split(',');
          if(datos[0] != "c_ClaveProdServ"){
              ClaveProducto.create({
                key:datos[0],
                description:datos[1]
              }).exec(function(err){
                if(err){
                  return exits.error("Error agregando: " + datos[0], datos[1]);
                }
                sails.log("Agregando: " + datos[0],datos[1]);
              })

          }

        })
        msg = "Complete";
      }else{
        msg = "Nada que agregar.";
      }
    })
    return exits.success(msg);

  }


};


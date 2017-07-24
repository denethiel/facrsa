/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var x509 = require('x509');
fs = require('fs');


module.exports = {
	create: function (req, res) {
        //sails.log.debug(req.body)
        User.update({id: req.body.id},{
                        name:req.body.name,
                        rfc: req.body.rfc,
                        telephone: parseInt(req.body.telephone),
                        fax: req.body.fax,
                        web: req.body.web,
                        gln: req.body.gln
                    }).exec(function (err, userUpdated){
                        if(err){
                            res.serverError(err);
                        }
                        sails.log(userUpdated);
                        if(userUpdated.address && userUpdated.address != '') {
                          sails.log("Usuario tiene direccion")
                          User.updateAddress(req.body, userUpdated.address ,function(err, user){
                            if(err){
                              res.serverError(err);
                            }
                            res.json(user);
                          })
                        }else{
                          sails.log("Usuario no tiene direccion");
                          User.addAddress(req.body, function(err, user){
                            if(err){res.serverError(err);}
                            res.json(user);
                          })
                        }
                    })

  },
  uploadCertificate:function(req, res){
    User.findOne(req.param('id')).exec(function(err, user){
      res.setTimeout(0);
      if(!req.file('file')._files[0]){
        sails.log.warn('No file uploaded');
        req.file('file').upload({noop:true});
        return res.json('no file given!');
      }
      req.file('file').upload({
      dirname: '../../files/'+user.rfc+'',
      saveAs:req.file('file').filename,
    }, function whenDone(err, keyFileUploaded){
      if(err) return res.serverError(err);
      res.json({
        filename: keyFileUploaded[0].fd
      })
    })
      /*req.file('cerFile').upload({
        dirname:'../../files',
        maxBytes:1000000
      }, function(err, cerFileUploaded){
        //sails.log(cerFileUploaded);
        if(err) return res.serverError(err);
        else return res.json({
        files: [keyFileUploaded,cerFileUploaded],
        textParams: req.allParams()
      });
      })*/

    });
  },
  test:function(req, res){
    var cert = x509.parseCert(__dirname+'/Test.cer');
    sails.log.warn(cert);

  }
  ,
  saveCertificate:function(req,res){
    Certificate.create({
      cer_file: req.body.cerFile,
      key_file: req.body.keyFile,
      password: req.body.password,
      owner: req.param('id')
    }).exec(function(err, certificate){
      if(err){return res.serverError(err)}
      res.json(certificate);
    })
  }
  ,
  addData:function(req,res){
      Address.create({
          street: req.body.street,
          num_ext: req.body.num_ext,
          num_int: req.body.num_int,
          colony: req.body.colony,
          postal_code: req.body.postal_code,
          city: req.body.city,
          town: req.body.town,
          state: req.body.state,
          country: req.body.country,
          reference: req.body.reference
        }).exec(function(err, address){
            if(err){return res.serverError(err);}
            res.json(address);

        })}


};


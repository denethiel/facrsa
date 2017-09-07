/**
 * CertificatesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
fs = require('fs');
module.exports = {

  upload:function(req, res){
    User.findOne(req.param('userId')).exec((err, user) => {
      res.setTimeout(0);
      if(!req.file('file')._files[0]){
        sails.log.warn('No file Uploaded');
        req.file('file').upload({noop:true});
        return res.json(500,{error: 'No file given!'});
      }
      req.file('file').upload({
        dirname: '../../files/'+user.rfc,
        saveAs: req.file('file').filename,
      }, (err, keyFileUploaded) => {
        //sails.log(keyFileUploaded[0]);
        res.json({
          filename: keyFileUploaded[0].fd
        })
      })
    });
  },
  get:function(req, res){
    let ownerId = req.param('userId');
    Certificate.find({owner: ownerId}).exec(function(err, certificates){
      //sails.log(certificates);
      if(err){res.serverError(err);}
      sails.sockets.join(req, ownerId, function(err){
        if(err){return res.serverError(err);}
        return res.json(certificates);
      });
    })
  },
  save:function(req, res){
    let ownerId = req.param('userId');
    sails.log(req.body);
    Certificate.create({
      cer_file: req.body.cerFile,
      key_file: req.body.keyFile,
      password: req.body.password,
      owner: ownerId
    }).meta({fetch:true})
      .exec(function(err, certificate){
        if(err){return res.serverError(err);}
        let msg = {
          verb: 'created',
          data: certificate
        }
        sails.sockets.broadcast(ownerId,"certificate",msg);
        res.ok();
      })
  },
  delete:function(req, res){
    //sails.log(req.body);
    let ownerId = req.param('userId');
    sails.log("Response Delete" + req.body.id);
    Certificate.destroy({id:req.body.id, owner: req.body.owner}).meta({fetch:true}).exec(function(err, deletedCertificate){

      sails.log(deletedCertificate);
      sails.log(err);
      if(err){return res.serverError(err);}
      let msg = {
        verb: 'destroy',
        data: deletedCertificate
      }

      sails.sockets.broadcast(ownerId,"certificate", msg);
      res.ok();
    })
  }
};


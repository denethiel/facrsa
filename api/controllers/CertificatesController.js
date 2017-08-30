/**
 * CertificatesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
fs = require('fs');
module.exports = {

  upload:function(req, res){
    User.findOne(req.param('id')).exec((err, user) => {
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
        res.json({
          filename: keyFileUploaded[0].fd
        })
      })
    });
  }
};


/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
  addCertificate:function(req, res){
    res.setTimeout(0);
    if(!req.file('keyFile')._files[0]){
      sails.log.warn('No file uploaded');
      req.file('keyFile').upload({noop:true});
      return res.json('no file given!');
    }
    sails.log(req.file('keyFile'));
    req.file('keyFile').upload({
      dirname: '/tmp/uploads'
    }, function whenDone(err, keyFileUploaded){
      sails.log(keyFileUploaded);
      if(err) return res.serverError(err);
      res.json({
        files: keyFileUploaded,
        textParams: req.allParams()
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


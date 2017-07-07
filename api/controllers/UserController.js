/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
        sails.log.debug("Hola estoy en create")
        res.json(req.body.id);
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


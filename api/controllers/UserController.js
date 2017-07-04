/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
        res.json(301,'To create user go to /auth/register');
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


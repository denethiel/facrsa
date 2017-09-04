/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	authenticate : function(req, res){
        var email = req.param('email');
        var password = req.param('password');

        if(!email || !password){
            return res.status(401).json({'error':'Email and password required'});
        }

        User.findOne({email:email}).populate('address').exec(function(err, user){
            if(!user){
                return res.status(401).json({'error':'Invalid email or password'});
            }
            User.validPassword(password, user, function(err, valid){
                if(err){
                    return res.status(403).json({'error':'Forbidden'});
                }
                if(!valid){
                    return res.status(401).json({'error':'Invalid email or password'});
                }else{
                    res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
                }
            });
        });
    },

    register : function (req, res){
        if(_.isUndefined(req.body.email)){
            return res.badRequest('Correo electronico requeridido');
        }
        if(_.isUndefined(req.body.password)){
            return res.badRequest('Contraseña requerida');
        }
        if(_.isUndefined(req.body.confirmPassword)){
            return res.badRequest('Confirmar contraseña requerida');
        }
        if(req.body.password !== req.body.confirmPassword){
            return res.status(401).send('Password does\'t match');
        }



        User.create({email: req.body.email, password: req.body.password}).meta({fetch: true}).exec(function(err, user){
            if(err){
                res.status(err.status).send(err);
                return;
            }
            if(user){
                res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
            }
        })
    }
};


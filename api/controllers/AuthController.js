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
            return res.json(401,'Email and password required');
        }

        User.findOneByEmail(email, function(err, user){
            if(!user){
                return res.json(401,'Invalid email or password');
            }
            User.validPassword(password, user, function(err, valid){
                if(err){
                    return res.json(403,'Forbidden');
                }
                if(!valid){
                    return res.json(401,'Invalid email or password');
                }else{
                    res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
                }
            });
        });
    },

    register : function (req, res){
        if(req.body.password !== req.body.confirmPassword){
            return res.json(401,'Password does\'t match');
        }

        User.create({email: req.body.name, password: req.body.password}).exec(function(err, user){
            if(err){
                res.json(err.status,err);
                return;
            }
            if(user){
                res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
            }
        })
    }
};


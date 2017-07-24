module.exports = function(req, res, next){
  var token;

  if(req.headers && req.headers.authorization){
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2){
      var scheme = parts[0],
        credentials = parts[1];
      if(/^Bearer$/i.test(scheme)){
        token = credentials;
      }
    }else{
      return res.json(401,{err:'Format is Authorization : Bearer [token]'});
    }
  }else if(req.param('token')){
    token = req.param('token');
    delete req.query.token;
  }else if(req.socket && req.socket.handshake && req.socket.handshake.query && req.socket.handshake.query.token){
    token = req.socket.handshake.query.token;
  }
  else{
    sails.log(req.socket.handshake);
    return res.json(401,{err:'No Authorization Header was found'});
  }
  sailsTokenAuth.verifyToken(token,function(err,token){
    if(err) return res.json(401,{err:'Token is not valid'});
    req.token = token;
    next();
  })
}
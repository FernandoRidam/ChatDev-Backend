const jwt = require('jsonwebtoken');

const authConfig = process.env.AUTH_KEY //Ridam@ChatDev

module.exports = {
  async generateToken( user_id ) {
    return jwt.sign({ user_id }, authConfig, {
      expiresIn: '3d',
    });
  },

  async authenticate( req, res, next ) {
    const authHeader = req.headers.authorization;

    if( !authHeader )
      return res.json({ success: false, message: 'Nenhum token informado!'});

    const parts = authHeader.split(' ');

    if( !parts.length === 2 )
      return res.json({ success: false, message: 'Erro de token!'});

    const [ scheme, token ] = parts;

    if( !/^Bearer$/i.test( scheme ))
      return res.json({ success: false, message: 'Formato do token é inválido!'});

    jwt.verify( token, authConfig, ( error, decoded ) => {
      if( error )
        return res.json({ success: false, message: 'Token inválido!' });

      req.user_id = decoded.user_id;

      return next();
    });
  },
};

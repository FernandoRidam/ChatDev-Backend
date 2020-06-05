const UserService = require('../services/UserService');

module.exports = {
  async create( req, res ) {
    const {
      username,
      email,
    } = req.body;

    const checkUsername = await UserService.checkUsername( username );

    if( checkUsername )
      return res.json({ success: false, message: 'Usuário já cadastrado!'});

    const checkEmail = await UserService.checkEmail( email );

    if( checkEmail )
      return res.json({ success: false, message: 'Email já cadastrado!'});

    const data = {
      username,
      email,
    };

    const user = await UserService.createUser( data );

    return res.json({ success: true, message: 'Usuário cadastrado com sucesso!', user });
  },

  async savePass( req, res ) {
    const {
      user_id,
      code,
      password,
      confirmPassword,
    } = req.body;

    if( password !== confirmPassword )
      return res.json({ success: false, message: 'Senhas não coincidem!'});

    const user = await UserService.getUser( user_id );

    if( !user )
      return res.json({ success: false, message: 'Usuário não encontrado!'});

    const verifyCode = await UserService.verifyCode( user_id, code );

    if( !verifyCode )
      return res.json({ success: false, message: 'Código informado está incorreto!'});

    await UserService.savePass( user_id, password );

    return res.json({ success: true, message: 'Senha salva com sucesso!'});
  },
};

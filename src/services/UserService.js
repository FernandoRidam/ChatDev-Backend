const axios = require('axios');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const auth = require('../config/auth');

const {
  codeGenerator,
} = require('../utils/hashGanerator');

const {
  transport,
} = require('../config/mail');

module.exports = {
  async createUser( newUser ) {
    // Coletar dados do GitHub, gerar código...
    const response = await axios.get(`https://api.github.com/users/${ newUser.username }`);

    const {
      name,
      bio,
      avatar_url,
    } = response.data;

    newUser.name = name;
    newUser.bio = bio;
    newUser.image = avatar_url;
    newUser.code = codeGenerator(6);

    const user = await User.create( newUser );

    return user;
  },

  async savePass( user_id, pass ) {
    const password = await  bcrypt.hash( pass, 10);

    await User.findByIdAndUpdate( user_id, { password, code: undefined });
  },

  async sendEmail( user ) {
    // Enviar código por email...
    transport.sendMail({
      from: 'ridam.chatdev@gmail.com',
      to: user.email,
      subject: `Código De Verificação Do ChatDev`,
      text: `Olá Sr(a) ${ user.name }, Seja bem vindo(a) a comunidade ChatDev. Aqui está o seu códgio de verificação: ${ user.code }`,
    }, ( error, info ) => {
      if( error )
        console.log( error );
    });
  },

  async getUser( user_id ) {
    const user = await User.findById( user_id );

    return user;
  },

  async checkUsername( username ) {
    const user = await User.findOne({ username });

    return user;
  },

  async checkEmail( email ) {
    const user = await User.findOne({ email });

    return user;
  },

  async verifyCode( user_id, code ) {
    const user = await User.findById( user_id ).select('+code');

    return user.code === code;
  },

  async login( user ) {
    const userResponse = await User.findOne({ username: user.username }).select('+password');

    if( !userResponse )
      return { success: false, message: 'Usuário não encontrado!' };

    const checkPass = await bcrypt.compare( user.password, userResponse.password );

    if( !checkPass )
      return { success: false, message: 'Senha Inválida!' };

      userResponse.password = undefined;

    const token = await auth.generateToken( userResponse._id );

    return { success: true, token };
  },
};

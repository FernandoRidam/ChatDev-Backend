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
    const checkUsername = await User.findOne({ username: newUser.username });

    if( checkUsername )
      return { success: false, message: 'Usuário já cadastrado!'};

    const checkEmail = await User.findOne({ email: newUser.email });

    if( checkEmail )
      return { success: false, message: 'Email já cadastrado!'};

    // Coletar dados do GitHub, gerar código...
    try {
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
    } catch( error ) {
      // Retornar resposta de acordo com status code do github
      return { success: false, message: 'Usuário GitHub não encontrado!'};
    };

    const user = await User.create( newUser );

    // Enviar código por email...
    transport.sendMail({
      from: 'ridam.chatdev@gmail.com',
      to: user.email,
      subject: `Código De Verificação Do ChatDev`,
      text: `Olá Sr(a) ${ user.name }, Seja bem vindo(a) a comunidade ChatDev. Aqui está o seu códgio de verificação: ${ user.code }`,
    }, ( error, info ) => {
      if( error ) {
        console.log( error );

        return { success: false, message: 'Problemas ao enviar email'};
      }
    });

    return { success: true, message: 'Usuário cadastrado com sucesso!', user_id: user._id };
  },

  async verifyCode( user_id, verify) {
    if( verify.password !== verify.confirmPassword )
      return { success: false, message: 'Senhas não coincidem!'};

    const user = await User.findById( user_id ).select('+code');

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    if( user.code !== verify.code )
      return { success: false, message: 'Código informado está incorreto!'};

    const password = await  bcrypt.hash( verify.password, 10);

    user.password = password;
    user.code = undefined;

    await user.save();

    return { success: true, message: 'Senha salva com sucesso!'};
  },

  async login( user ) {
    const userResponse = await User.findOne({ username: user.username }).select('+password');

    if( !userResponse )
      return { success: false, message: 'Usuário não encontrado!' };

    if( !userResponse.password )
      return { success: false, message: 'Cadastro não finalizado!' };

    const checkPass = await bcrypt.compare( user.password, userResponse.password );

    if( !checkPass )
      return { success: false, message: 'Senha Inválida!' };

      userResponse.password = undefined;

    const token = await auth.generateToken( userResponse._id );

    return { success: true, message: 'Login efetuado com sucesso!', token };
  },
};

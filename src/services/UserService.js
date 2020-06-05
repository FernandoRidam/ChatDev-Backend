const User = require('../models/User');

module.exports = {
  async createUser( newUser ) {
    // Coletar dados do GitHub, gerar código
    // newUser.code = '000000';
    // ...

    const user = await User.create( newUser );

    return user;
  },

  async savePass( user_id, password ) {
    const user = await User.findByIdAndUpdate( user_id, { password });

    return user;
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
    const user = await User.findById( user_id );

    return user.code === code;
  },
};

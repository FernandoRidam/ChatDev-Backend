const UserService = require('../services/UserService');

module.exports = {
  async store( req, res ) {
    const {
      username,
      email,
    } = req.body;

    const response = await UserService.createUser({ username, email });

    return res.json( response );
  },

  async verifyCode( req, res ) {
    const {
      _id: user_id,
    } = req.params;

    const {
      code,
      password,
      confirmPassword,
    } = req.body;

    const response = await UserService.verifyCode( user_id, { code, password, confirmPassword });

    return res.json( response );
  },

  async login( req, res ) {
    const {
      username,
      password,
    } = req.body;

    const response = await UserService.login({ username, password });

    return res.json( response );
  },

  async getProfile( req, res ) {
    const user_id = req.user_id;

    const {
      _id: profile_id,
    } = req.params;

    const response = await UserService.getProfile( user_id, profile_id );

    return res.json( response );
  },
};

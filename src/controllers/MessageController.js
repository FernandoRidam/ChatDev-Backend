const MessageService = require('../services/MessageService');

module.exports = {
  async store( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const {
      text,
    } = req.body;

    const response = await MessageService.sendMessage( user_id, group_id, text );

    return res.json( response );
  },

  async index( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const response = await MessageService.listMessage( user_id, group_id );

    return res.json( response );
  },
};

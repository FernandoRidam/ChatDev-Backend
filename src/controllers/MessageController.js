const MessageService = require('../services/MessageService');
const GroupService = require('../services/GroupService');

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

    if( response.success ) {
      await GroupService.sendMessageSocket( req.io, group_id, req.onlineUsers, response.messageData );
    }

    return res.json( response );
  },

  async index( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const {
      page = 1,
    } = req.query;

    const response = await MessageService.listMessage( user_id, group_id, parseInt( page ));

    return res.json( response );
  },
};

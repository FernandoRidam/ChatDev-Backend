const User = require('../models/User');
const Group = require('../models/Group');
const Message = require('../models/Message');

module.exports = {
  async sendMessage( user_id, group_id, text ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    const group = await Group.findById( group_id );

    if( !group_id )
      return { success: false, message: 'Grupo não encontrado'};

    const isMember = group.members.some(( element, index, array ) => {
      const id = element.toString();

      return id === user_id;
    });

    if( !isMember )
      return { success: false, message: 'Você não é membro deste grupo!'};

    const message = await Message.create({
      user_id,
      group_id,
      text,
    });

    return message;
  },

  async listMessage( user_id, group_id ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    const group = await Group.findById( group_id );

    if( !group_id )
      return { success: false, message: 'Grupo não encontrado'};

    const isMember = group.members.some(( element, index, array ) => {
      const id = element.toString();

      return id === user_id;
    });

    if( !isMember )
      return { success: false, message: 'Você não é membro deste grupo!'};

    const messages = await Message
      .find()
      .populate({
        path: 'user_id',
        select: 'name',
      })
      .where({ group_id })

      return messages;
  },
};
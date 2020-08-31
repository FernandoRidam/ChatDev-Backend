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

    const msg = await Message.create({
      user_id,
      group_id,
      text,
    });

    const message = await Message.findById( msg._id ).populate({
      path: 'user_id',
      select: 'name',
    });

    return { success: true, message: 'Mensagem enviada com sucesso!', messageData: message };
  },

  async listMessage( user_id, group_id, page ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    const group = await Group.findById( group_id );

    if( !group )
      return { success: false, message: 'Grupo não encontrado'};

    const isMember = group.members.some(( element, index, array ) => {
      const id = element.toString();

      return id === user_id;
    });

    if( !isMember )
      return { success: false, message: 'Você não é membro deste grupo!'};

    const totalCount = await Message.countDocuments().where({ group_id });

    const messages = await Message
      .find()
      .sort({ createdAt: -1 })
      .skip( 10 * ( page - 1 ))
      .limit( 10 )
      .populate({
        path: 'user_id',
        select: 'name',
      })
      .where({ group_id });

      return { success: true, message: 'Listagem de mensagens com sucesso!', messages, totalCount };
  },
};

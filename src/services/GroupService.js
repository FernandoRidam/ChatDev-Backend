const User = require('../models/User');
const Group = require('../models/Group');

module.exports = {
  async createGroup( user_id, newGroup ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    const group = await Group.create({
      creator_id: user_id,
      name: newGroup.name,
      subject: newGroup.subject,
      members: [ user_id ],
    });

    return { success: true, message: 'Grupo criado com sucesso!', group };
  },

  async listGroup() {
    const groups = await Group.find().select('-members');

    // const interactingGroups = groups.filter( group => {
    //   return group.members.some(( element, index, array ) => {
    //     const id = element.toString();

    //     return id === user_id;
    //   });
    // });

    return { success: true, message: 'Grupos listados com sucesso!', groups };
  },

  async showGroup( group_id ) {
    const group = await Group.findById( group_id );

    if( !group )
      return { success: false, message: 'Grupo não encontrado!'};

    return group;
  },

  async updateGroup( user_id, group_id, newGroup ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado'};

    const group = await Group.findById( group_id );

    if( !group )
      return { success: false, message: 'Grupo não encontrado'};

    const id = group.creator_id.toString();

    if( id !== user_id )
      return { success: false, message: 'Você não tem permisão de alterar informações deste grupo!'};

    group.name = newGroup.name;
    group.subject = newGroup.subject;

    await group.save();

    return { success: true, message: 'Informações do grupo alteradas com sucesso!'};
  },

  async deleteGroup( user_id, group_id ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado'};

    const group = await Group.findById( group_id );

    if( !group )
      return { success: false, message: 'Grupo não encontrado'};

    const id = group.creator_id.toString();

    if( id !== user_id )
      return { success: false, message: 'Você não tem permisão para deletar este grupo!'};

    await group.delete();

    return { success: true, message: 'Grupo finalizado com sucesso!'};
  },

  async joinGroup( user_id, group_id ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    const group = await Group.findById( group_id );

    if( !group )
      return { success: false, message: 'Grupo não encontrado!'};

    const isMember = group.members.some(( element, index, array ) => {
      const id = element.toString();

      return id === user_id;
    });

    if( isMember )
      return { success: false, message: 'Você já é membro deste grupo!'};

    group.members.push( user_id );

    await group.save();

    return { success: true, message: `Pronto! Você agora faz parte do grupo ${ group.name }`};
  },

  async exitGroup( user_id, group_id ) {
    const user = await User.findById( user_id );

    if( !user )
      return { success: false, message: 'Usuário não encontrado!'};

    const group = await Group.findById( group_id );

    if( !group )
      return { success: false, message: 'Grupo não encontrado!'};

    const isMember = group.members.some(( element, index, array ) => {
      const id = element.toString();

      return id === user_id;
    });

    if( !isMember )
      return { success: false, message: 'Você não é membro deste grupo!'};

    group.members.splice( group.members.indexOf( user_id ), 1 );

    await group.save();

    return { success: true, message: `Pronto! Você deixou o grupo ${ group.name }`};
  },
}

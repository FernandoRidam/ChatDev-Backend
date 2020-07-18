const GroupService = require('../services/GroupService');

module.exports = {
  async store( req, res ) {
    const user_id = req.user_id;

    const {
      name,
      subject,
    } = req.body;

    const response = await GroupService.createGroup( user_id, { name, subject });

    return res.json( response );
  },

  async index( req, res ) {
    const user_id = req.user_id;

    const groups = await GroupService.listGroup( user_id );

    return res.json( groups );
  },

  async show( req, res ) {
    const {
      _id: group_id,
    } = req.params;

    const response = await GroupService.showGroup( group_id );

    return res.json( response );
  },

  async update( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const {
      name,
      subject,
    } = req.body;

    const response = await GroupService.updateGroup( user_id, group_id, { name, subject });

    return res.json( response );
  },

  async delete( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const response = await GroupService.deleteGroup( user_id, group_id );

    return res.json( response );
  },

  async join( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const response = await GroupService.joinGroup( user_id, group_id );

    return res.json( response );
  },

  async exit( req, res ) {
    const user_id = req.user_id;

    const {
      _id: group_id,
    } = req.params;

    const response = await GroupService.exitGroup( user_id, group_id );

    return res.json( response );
  },
};

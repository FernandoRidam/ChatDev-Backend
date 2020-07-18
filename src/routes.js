const { Router } = require('express');

const auth = require('./config/auth');

const UserController = require('./controllers/UserController');
const GroupController = require('./controllers/GroupController');
const MessageController = require('./controllers/MessageController');

const routes = Router();

// Users...
routes.post('/users', UserController.store );
routes.post('/users/code/:_id', UserController.verifyCode );
routes.post('/users/login', UserController.login );

routes.get('/users/:_id', auth.authenticate, UserController.getProfile );

// Goups...
routes.post('/groups', auth.authenticate, GroupController.store );
routes.get('/groups', auth.authenticate, GroupController.index );
routes.get('/groups/:_id', auth.authenticate, GroupController.show );
routes.put('/groups/:_id', auth.authenticate, GroupController.update );
routes.delete('/groups/:_id', auth.authenticate, GroupController.delete );
routes.get('/groups/join/:_id', auth.authenticate, GroupController.join );
routes.get('/groups/exit/:_id', auth.authenticate, GroupController.exit );

// Messages...
routes.post('/messages/:_id', auth.authenticate, MessageController.store );
routes.get('/messages/:_id', auth.authenticate, MessageController.index );

module.exports = routes;

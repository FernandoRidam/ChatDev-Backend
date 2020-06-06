const { Router } = require('express');

const UserController = require('./controllers/UserController');

const routes = Router();

routes.post('/users', UserController.create );
routes.post('/users/verify_code/:_id', UserController.savePass );

module.exports = routes;

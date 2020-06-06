const { Router } = require('express');

const UserController = require('./controllers/UserController');

const routes = Router();

// Users...
routes.post('/users', UserController.create );
routes.post('/users/verify_code/:_id', UserController.savePass );
routes.post('/users/login', UserController.login )

module.exports = routes;

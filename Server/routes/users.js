const express = require('express');

const { controllerWithTryCatch } = require('../utils');
const { usersController } = require('../controllers');
const { isAdmin, authenticateJWT, requestValidator } = require('../middlewares');

const usersRouter = express.Router();

usersRouter.get(
   '/', 
   [authenticateJWT, isAdmin], 
   controllerWithTryCatch({
   callback: usersController.getAllUsers,
   statusSuccess: 200,
   statusError: 400,
}));

usersRouter.delete(
   '/:id', 
   [authenticateJWT, requestValidator], 
   controllerWithTryCatch({
   callback: usersController.deleteUser,
   statusSuccess: 202,
   statusError: 404,
}));

usersRouter.patch(
   '/:id', 
   [authenticateJWT, requestValidator], 
   controllerWithTryCatch({
   callback: usersController.updateUser,
   statusSuccess: 201,
   statusError: 404,
}));

module.exports = usersRouter;

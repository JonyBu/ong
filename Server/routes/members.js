const express = require('express');

const { bodyValidator, authenticateJWT, isAdmin } = require('../middlewares');
const { controllerWithTryCatch } = require('../utils');
const { membersController } = require('../controllers');
const { createMemberSchema } = require('../utils/schemaValidations');

const membersRouter = express.Router();

membersRouter.post('/',
  authenticateJWT,
  isAdmin,
  bodyValidator(createMemberSchema),
  controllerWithTryCatch({
    callback: membersController.createMember,
    statusSuccess: 201,
    statusError: 400,
  })
);

membersRouter.get('/', controllerWithTryCatch({
  callback: membersController.getAllMembers,
  statusSuccess: 200,
  statusError: 400,
}));

membersRouter.put('/:id',
  authenticateJWT,
  isAdmin,
  bodyValidator(createMemberSchema),
  controllerWithTryCatch({
    callback: membersController.updateMember,
    statusSuccess: 202,
    statusError: 404,
  })
);  

membersRouter.delete('/:id',
  authenticateJWT,
  isAdmin,
  controllerWithTryCatch({
    callback: membersController.deleteMember,
    statusSuccess: 202,
    statusError: 404,
  })
);

module.exports = membersRouter;

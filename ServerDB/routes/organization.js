const express = require('express');
const { organizationController } = require('../controllers');
const { controllerWithTryCatch } = require('../utils')
const { authenticateJWT, isAdmin } = require('../middlewares')
const { uploadSliders } = require('../middlewares/multer');
const organizationRouter = express.Router();

organizationRouter.get('/', controllerWithTryCatch({
  callback: organizationController.getOrganizationData,
  statusSuccess: 200,
  statusError: 500
}));

organizationRouter.patch('/:id',
  authenticateJWT,
  isAdmin,
  uploadSliders,
  controllerWithTryCatch({
    callback: organizationController.updateOrganization,
    statusSuccess: 200,
    statusError: 500
  })
);

module.exports = organizationRouter;
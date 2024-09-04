const express = require('express');
const { authorize } = require('../middlewares/auth-middleware');
const { checkPermissions } = require('../middlewares/permission-middleware');
const { FEATURES, PERMISSIONS } = require('../utils/constants');
const propertyController = require('../controllers/properties-controller');
// const { schemaValidator } = require('../middlewares/schema-validator');

const router = express.Router();

router.get('/', authorize, checkPermissions(FEATURES.PROPERTY, PERMISSIONS.VIEW), propertyController.listProperties);
router.post(
  '/',
  authorize,
  checkPermissions(FEATURES.PROPERTY, PERMISSIONS.CREATE),
  propertyController.createProperties
);
router.put(
  '/',
  authorize,
  checkPermissions(FEATURES.PROPERTY, PERMISSIONS.UPDATE),
  propertyController.updateProperties
);
router.delete(
  '/:id',
  authorize,
  checkPermissions(FEATURES.PROPERTY, PERMISSIONS.DELETE),
  propertyController.deleteProperty
);
router.get('/:id', authorize, checkPermissions(FEATURES.PROPERTY, PERMISSIONS.VIEW), propertyController.propertyInfo);
module.exports = router;

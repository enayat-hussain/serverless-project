const express = require('express');
const { authorize } = require('../middlewares/auth-middleware');
const { checkPermissions } = require('../middlewares/permission-middleware');
const { FEATURES, PERMISSIONS } = require('../utils/constants');
const client = require('../controllers/clients-controller');
const { createClientSchema, updateClientSchema } = require('../validationSchemas/client-schema');
const { schemaValidator } = require('../middlewares/schema-validator');

const router = express.Router();

router.post(
  '/',
  authorize,
  checkPermissions(FEATURES.CLIENT, PERMISSIONS.CREATE),
  schemaValidator(createClientSchema),
  client.create
);
router.put(
  '/',
  authorize,
  checkPermissions(FEATURES.CLIENT, PERMISSIONS.UPDATE),
  schemaValidator(updateClientSchema),
  client.update
);
router.put(
  '/disbale-enable',
  authorize,
  checkPermissions(FEATURES.CLIENT, PERMISSIONS.UPDATE),
  schemaValidator(updateClientSchema),
  client.disableEnableClient
);
router.get('/', authorize, checkPermissions(FEATURES.CLIENT, PERMISSIONS.VIEW), client.list);
router.get('/:id', client.ClientInfo);
router.delete(
  '/:id',
  authorize,
  checkPermissions(FEATURES.CLIENT, PERMISSIONS.DELETE),
  client.delete
);
module.exports = router;

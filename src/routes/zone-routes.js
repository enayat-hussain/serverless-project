const express = require('express');
const { authorize } = require('../middlewares/auth-middleware');
const { checkPermissions } = require('../middlewares/permission-middleware');
const { FEATURES, PERMISSIONS } = require('../utils/constants');
const zone = require('../controllers/zone-controller');
const { createZoneSchema, updateZoneSchema } = require('../validationSchemas/zone-schema');
const { schemaValidator } = require('../middlewares/schema-validator');

const router = express.Router();

router.post(
  '/',
  authorize,
  checkPermissions(FEATURES.ZONE, PERMISSIONS.CREATE),
  schemaValidator(createZoneSchema),
  zone.create
);
router.put(
  '/',
  authorize,
  checkPermissions(FEATURES.ZONE, PERMISSIONS.VIEW),
  schemaValidator(updateZoneSchema),
  zone.update
);
router.delete(
  '/:id',
  authorize,
  checkPermissions(FEATURES.ZONE, PERMISSIONS.VIEW),
  zone.deleteZone
);
router.get('/', authorize, checkPermissions(FEATURES.ZONE, PERMISSIONS.VIEW), zone.list);
router.get('/:id', authorize, checkPermissions(FEATURES.ZONE, PERMISSIONS.VIEW), zone.getZoneInfo);
module.exports = router;

const express = require('express');
const { authorize } = require('../middlewares/auth-middleware');
const { checkPermissions } = require('../middlewares/permission-middleware');
const { FEATURES, PERMISSIONS } = require('../utils/constants');
const userGroupService = require('../controllers/user-group-controller');
const { createUserGroupSchema, updateUserGroupSchema } = require('../validationSchemas/user-group-schema');
const { schemaValidator } = require('../middlewares/schema-validator');

const router = express.Router();

router.get('/', authorize, checkPermissions(FEATURES.USER_GROUP, PERMISSIONS.VIEW), userGroupService.listUserGroup);
router.post(
  '/',
  authorize,
  checkPermissions(FEATURES.USER_GROUP, PERMISSIONS.CREATE),
  schemaValidator(createUserGroupSchema),
  userGroupService.createUserGroup
);
router.put(
  '/',
  authorize,
  checkPermissions(FEATURES.USER_GROUP, PERMISSIONS.UPDATE),
  schemaValidator(updateUserGroupSchema),
  userGroupService.updateUserGroup
);
router.delete(
  '/:id',
  authorize,
  checkPermissions(FEATURES.USER_GROUP, PERMISSIONS.DELETE),
  userGroupService.deleteUserGroup
);
router.get('/:id', authorize, checkPermissions(FEATURES.USER_GROUP, PERMISSIONS.VIEW), userGroupService.userGroupInfo);
module.exports = router;

const express = require('express');
const { authorize } = require('../middlewares/auth-middleware');
const { checkPermissions } = require('../middlewares/permission-middleware');
const { FEATURES, PERMISSIONS } = require('../utils/constants');
const userService = require('../controllers/user-controller');
const { createUserSchema, enableDisableUserSchema, updateUserSchema } = require('../validationSchemas/user-schema');
const { schemaValidator } = require('../middlewares/schema-validator');

const router = express.Router();

// user Case to validate permission
//router.post(
//  '/test',
//  authorize,
//  checkPermissions(FEATURES.TRANSFER_OWNERSHIP, PERMISSIONS.CREATE)
//);
router.post(
  '/',
  authorize,
  checkPermissions(FEATURES.USER, PERMISSIONS.CREATE),
  schemaValidator(createUserSchema),
  userService.createUser
);
router.post(
  '/disable',
  authorize,
  checkPermissions(FEATURES.USER, PERMISSIONS.UPDATE),
  schemaValidator(enableDisableUserSchema),
  userService.disableUser
);
router.post(
  '/enable',
  authorize,
  checkPermissions(FEATURES.USER, PERMISSIONS.UPDATE),
  schemaValidator(enableDisableUserSchema),
  userService.enableUser
);
router.post('/verify', authorize, checkPermissions(FEATURES.USER, PERMISSIONS.UPDATE), userService.userVerify);
router.post('/bulk', authorize, checkPermissions(FEATURES.USER, PERMISSIONS.CREATE), userService.addBulkUser);
router.get('/:userId', authorize, checkPermissions(FEATURES.USER, PERMISSIONS.VIEW), userService.userInfo);
router.get('/', authorize, checkPermissions(FEATURES.USER, PERMISSIONS.VIEW), userService.listUser);
router.get(
  '/resend/:userId',
  authorize,
  checkPermissions(FEATURES.USER, PERMISSIONS.UPDATE),
  userService.resendInvitation
);
router.put(
  '/',
  authorize,
  checkPermissions(FEATURES.USER, PERMISSIONS.UPDATE),
  schemaValidator(updateUserSchema),
  userService.updateUser
);
router.put('/bulk', checkPermissions(FEATURES.USER, PERMISSIONS.UPDATE), userService.updateBulkUser);
router.delete('/', authorize, checkPermissions(FEATURES.USER, PERMISSIONS.DELETE), userService.deleteUser);
router.delete('/bulk', authorize, checkPermissions(FEATURES.USER, PERMISSIONS.DELETE), userService.deleteBulkUser);
module.exports = router;

const express = require('express');
const { authorize } = require('../middlewares/auth-middleware');
const { checkPermissions } = require('../middlewares/permission-middleware');
const { FEATURES, PERMISSIONS } = require('../utils/constants');
const customerController = require('../controllers/customers-controller');

const router = express.Router();

router.get(
  '/',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.VIEW),
  customerController.listCustomer
);
router.post(
  '/',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.UPDATE),
  customerController.createCustomer
);
router.put(
  '/',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.UPDATE),
  customerController.updateCustomer
);

router.get(
  '/sendOtp',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.VIEW),
  customerController.sendOtp
);
router.post(
  '/transferOwnership',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.VIEW),
  customerController.transferOwnership
);
router.delete(
  '/:id',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.DELETE),
  customerController.deleteCustomer
);
router.get(
  '/:id',
  authorize,
  checkPermissions(FEATURES.CUSTOMER_ACCOUNT, PERMISSIONS.VIEW),
  customerController.customerInfo
);
module.exports = router;

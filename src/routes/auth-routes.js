const express = require('express');
const { loginValidationSchema } = require('../validationSchemas/auth-schema');
const { schemaValidator } = require('../middlewares/schema-validator');
const { login, forgotPassword, confirmPassword } = require('../controllers/auth-controller');

const router = express.Router();

// user Case to validate permission
//router.post(
//  '/test',
//  authorize,
//  checkPermissions(FEATURES.TRANSFER_OWNERSHIP, PERMISSIONS.CREATE)
//);
router.post('/login', schemaValidator(loginValidationSchema), login);
router.post('/forget-password', forgotPassword);
router.post('/forget-password/confirm', confirmPassword);

module.exports = router;

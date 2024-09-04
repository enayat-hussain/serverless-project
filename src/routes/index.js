const express = require('express');
const router = express.Router();
const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');
const userGroupRoutes = require('./user-group-routes');
const clientRoutes = require('./client-routes');
const propertiesRoutes = require('./properties-routes');
const customersRoutes = require('./customers-routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/user-groups', userGroupRoutes);
router.use('/properties', propertiesRoutes);
router.use('/customers', customersRoutes);
module.exports = router;

const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const articleRoutes = require('./articleRoutes');
const commandeRoutes = require('./commandeRoutes');
const menuRoutes = require('./menuRoutes');

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use('/commandes', commandeRoutes);
router.use('/menus', menuRoutes);

module.exports = router;

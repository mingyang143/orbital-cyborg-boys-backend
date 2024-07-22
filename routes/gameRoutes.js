const express = require('express');
const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.route('/').get(authController.protect, gameController.getAllGames);

module.exports = router;

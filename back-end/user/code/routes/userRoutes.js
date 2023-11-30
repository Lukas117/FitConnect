// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
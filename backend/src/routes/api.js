const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

// User routes
router.get('/populate', userController.populate);
router.get('/users', userController.getAll);
router.post('/user-search', userController.search); // Changed endpoint name to be more descriptive

// Comment routes
router.post('/comment', commentController.create);
router.get('/comments', commentController.list);

module.exports = router;

const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/contentController');
const { authenticateToken } = require('../config/auth');
const upload = require('../config/multerconfig');

router.post('/', authenticateToken, upload.array('images', 5), ContentController.upload);
router.get('/', authenticateToken, ContentController.getUserContent);

module.exports = router;
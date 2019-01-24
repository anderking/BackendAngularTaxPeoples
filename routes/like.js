'use strict'

var express = require('express');
var LikeController = require('../controllers/like');
const auth = require('../middlewares/auth');
var router = express.Router();

router.post('/likes/:id', LikeController.upLikes);
router.put('/likes/:id', LikeController.disLikes);
router.get('/likes/:id', LikeController.getLikes);
router.get('/islikes/:idU/:idP', LikeController.isLike);

module.exports = router;
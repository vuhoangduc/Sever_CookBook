const express = require('express');
const route = express.Router();
const interactionController = require('../controllers/InteractionsController');
route.post('/likePost',interactionController.LikePost);
route.delete('/UnLikePost/:id_user/:id_post',interactionController.UnLikePost);
route.get('/getAllLike/:id_post',interactionController.GetAllLike);

route.post('/commentPost',interactionController.CommentPost);
route.get('/getAllcomment/:id_post',interactionController.getAllComment);
route.delete('/deleteComment/:id_post/:id_user',interactionController.DeleteComment);
route.post('/taohoadon',interactionController.TaoHoaDon);
// route.delete('/UncommentPost/:id_user/:id_post',interactionController.UncommentPost);
// route.get('/',interactionController);
module.exports = route;
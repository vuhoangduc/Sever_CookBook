const express = require('express');
const route = express.Router();
const upload = require('../util/upload_file');
const postController = require('../controllers/PostController');
route.get('/getpost/:id_user',postController.getPosts);
route.post('/addPost',upload.single('img_file'),postController.AddPost);
route.delete('/delete/:id',postController.Delete);
module.exports = route;
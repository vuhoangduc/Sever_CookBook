const express = require('express');
const route = express.Router();
const topicController = require('../controllers/TopicController');
const upload = require('../util/upload_file');
route.post('/addnew',upload.single('img_file'),topicController.addNew);
route.get('/',topicController.getall);

// route.get('/',topicController);
module.exports = route;
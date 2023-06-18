const express = require('express');
const route = express.Router();
const upload = require('../util/upload_file');

const userController = require('../controllers/UserController');

route.post('/login',userController.login);
route.post('/signup',userController.signup);
route.put('/setup/:id',upload.single('img_file'),userController.update);
route.put('/edit/:id',upload.single('img_file'),userController.edit);
route.get('/getById/:id',userController.getuser);
route.get('/',userController.getall);
module.exports = route;
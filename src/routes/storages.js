const express = require('express');
const route = express.Router();
const storagesController = require('../controllers/StoragesController');
// route.get('/',storagesController);
route.post('/saveRecipes',storagesController.saveRecipes);
route.delete('/cancel_saveRecipes/:id',storagesController.cancel_saveRecipes);

module.exports = route;
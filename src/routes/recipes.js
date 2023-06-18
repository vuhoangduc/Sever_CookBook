const express = require('express');
const route = express.Router();
const recipesController = require('../controllers/RecipesController');


route.post('/ealuate/:id',recipesController.AddEaluate)
route.get('/:id',recipesController.getbyid);
route.get('/',recipesController.getall);


module.exports = route;
const fs = require('fs');
const recipe_data = require('../models/Recipes');
const api_url = require('../util/Api_url');
class RecipesController{
    // [GET] /recipes
    getall(req, res, next) {
        recipe_data.find({})
        .populate('_id_topic', 'name')
          .then(results => {
            const data = results.map(result => ({
              _id:result._id,
              name_topic:result._id_topic.name,
              name_food: result.name_food,
              title: result.title,
              img_url: result.img_url
            }));
            res.send(data);
          })
          .catch(error => {
            // Xử lý lỗi
          });
      }
    // [GET] /recipes/:id
    getbyid(req,res,next){
        const _id = req.params.id;
        recipe_data.findOne({_id:_id})
        .then(result=>{
          res.status(200).send({ message: 'thành công', result });
        })
    }
    // [POST] /recipes/ealuate/:id
    AddEaluate(req,res,next){
        const recipeId = req.params.id;
        const newEvaluation = req.body;
      
        recipe_data.findByIdAndUpdate(
          recipeId,
          { $push: { evaluate: newEvaluation } },
          { new: true },
          (err, updatedRecipe) => {
            if (err) {
              console.error('Lỗi khi cập nhật công thức:', err);
              return res.status(500).json({ error: 'Đã xảy ra lỗi' });
            }
      
            res.json(updatedRecipe);
          }
        );
    }
    
    
}
module.exports = new RecipesController;
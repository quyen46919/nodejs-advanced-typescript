const dishValidation = require('../../validations/dish.validation');
const dishController = require('../../controllers/dish.controller');
var validate = require('../../middlewares/validate.middlewares');
var express = require('express');
var router = express.Router();

router.route('/')
    .get(dishController.getAllDishes)
    .post(validate(dishValidation.createNewDish), dishController.createNewDish);

router.route('/:dishId')
    .get(dishController.getDishDetail)
    .delete(dishController.deleteDish)
    .patch(validate(dishValidation.updateDish), dishController.updateDish);



module.exports = router;
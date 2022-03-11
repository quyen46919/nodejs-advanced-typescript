var Joi = require('joi');

const getAllDishes = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
}

const getDishDetail = {
    params: Joi.object().keys({
        dishId: Joi.string(),
    }),
}

const createNewDish = {
    body: Joi.object().keys({
        name: Joi.string().min(10).max(1000).required(),
        description: Joi.string().min(0).max(500).required(),
        prepTime: Joi.number().min(1).max(1440).required(),
        cookTime: Joi.number().min(1).max(1440).required(),
        image: Joi.string().min(6).required(),
        level: Joi.string().valid('Dễ', 'Trung bình', 'Khó').required(),
        ingredients: Joi.array().items(Joi.string()).min(1).required(),
        steps: Joi.array().items({
            step: Joi.number().required(),
            images: Joi.array(),
            title: Joi.string(),
            content: Joi.string(),
            note: Joi.string().allow(''),
        }).min(1)
        .required(),
    }),
};

const updateDish = {
    params: Joi.object().keys({
      dishId: Joi.required(),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string().min(10).max(1000),
        description: Joi.string().min(0).max(500),
        prepTime: Joi.number().min(1).max(1440),
        image: Joi.string().min(6),
        cookTime: Joi.number().min(1).max(1440),
        level: Joi.string().valid('Dễ', 'Trung bình', 'Khó'),
        ingredients: Joi.array().items(Joi.string()).min(1),
        steps: Joi.array().items().min(1),
      })
      .min(1),
};

const deleteDish = {
    params: Joi.object().keys({
      dishId: Joi.string(),
    }),
};


module.exports = {
    getAllDishes,
    getDishDetail,
    createNewDish,
    updateDish,
    deleteDish
}
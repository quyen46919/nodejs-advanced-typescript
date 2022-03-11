const Joi = require('joi');
var ObjectId = require('mongodb').ObjectId;
// import ts types
import { Request } from "express";
import { getDB } from "../mongodb.connect";

const DISH_COLLECTION_NAME: string = 'dishes';
const DISH_SCHEMA = Joi.object({
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
});

const validateSchema = async (data: Request) => {
    return await DISH_SCHEMA.validateAsync(data, { abortEarly: false });
};


const isExistedDish = async (dishId: string) => {
    console.log("isExistedDish");
    const dishObjectId = ObjectId(dishId);
    const result = await getDB().collection(DISH_COLLECTION_NAME).findOne({ _id: { $ne: dishObjectId } });
    return !!result;
};

const createNewDish = async (data: Request) => {
    try {
        const value = await validateSchema(data);
        const result = getDB().collection(DISH_COLLECTION_NAME).insertOne(value);
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
};

const getAllDishes = async () => {
    try {
        const result = getDB().collection(DISH_COLLECTION_NAME).find().toArray();
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
};

const getDishDetail = async (dishId: string) => {
    const dishObjectId = ObjectId(dishId);
    try {
        const result = getDB().collection(DISH_COLLECTION_NAME).findOne({ _id: dishObjectId });
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
};

const updateDish = async (dishId: string, requestBody: Object) => {
    const dishObjectId = ObjectId(dishId);
    console.log(dishObjectId);
    // console.log(requestBody);
    try {
        const result = getDB().collection(DISH_COLLECTION_NAME).updateOne(
            { _id: dishObjectId },
            { $set: requestBody }
        );
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
};

const deleteDish = async (dishId: string) => {
    const dishObjectId = ObjectId(dishId);
    try {
        const result = getDB().collection(DISH_COLLECTION_NAME).deleteOne({ _id: dishObjectId });
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
};

module.exports.DishModel = {
    createNewDish,
    getAllDishes,
    getDishDetail,
    deleteDish,
    updateDish,
    isExistedDish
}
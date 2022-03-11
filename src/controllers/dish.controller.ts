import { Request, Response } from "express";
const httpStatus = require("http-status");
const { getDB } = require("../mongodb.connect");
const { DishModel } = require("../models/dish.model");
var ObjectId = require('mongodb').ObjectId;

const createNewDish = async (req: Request, res: Response) => {
    try {
        const result = await DishModel.createNewDish(req.body);
        const createdDish = await DishModel.getDishDetail(ObjectId(result.insertedId));
        res.status(httpStatus.OK).send(createdDish);
    } catch (err: any) {
        console.log(err);
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const getAllDishes = async (req: Request, res: Response) => {
    try {
        const result = await DishModel.getAllDishes();
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const getDishDetail = async (req: Request, res: Response) => {
    try {
        const result = await DishModel.getDishDetail(req.params.dishId);
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const updateDish = async (req: Request, res: Response) => {
    try {
        if (await DishModel.isExistedDish(req.params.dishId)) {
            res.status(httpStatus.BAD_REQUEST).send('Công thức món ăn này không tồn tại!');
        } else {
            await DishModel.updateDish(req.params.dishId, req.body);
            const updatedDish = await DishModel.getDishDetail(req.params.dishId);
            res.status(httpStatus.OK).json(updatedDish);
        }
    } catch (err: any) {
        console.log(err);
        res.status(httpStatus.BAD_REQUEST).send(err);
    }
};

const deleteDish = async (req: Request, res: Response) => {
    try {
        await DishModel.deleteDish(req.params.dishId);
        res.status(httpStatus.NO_CONTENT).send('Deleted');
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

module.exports = {
    createNewDish,
    getAllDishes,
    getDishDetail,
    deleteDish,
    updateDish
}
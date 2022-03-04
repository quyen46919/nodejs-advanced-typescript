const Joi = require('joi');
// import ts types
import { Request } from "express";
import { getDB } from "../mongodb.connect";

const USER_COLLECTION_NAME: string = 'users';
const USER_SCHEMA = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(4).max(20).required(),
    address: Joi.string().max(255).required(),
    status: Joi.boolean().default(true),
    created: Joi.date().timestamp().default(Date.now()),
    update: Joi.date().default(null)
});

const validateSchema = async (data: Request) => {
    return await USER_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNewUser = async (data: Request) => {
    try {
        const value = await validateSchema(data);
        const result = getDB().collection(USER_COLLECTION_NAME).insertOne(value);
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
};

const getAllUsers = async () => {
    try {
        const result = await getDB().collection('users').find().toArray();
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
}

module.exports.UserModel = {
    createNewUser,
    getAllUsers,
}
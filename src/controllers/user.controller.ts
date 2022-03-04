import { Request, Response } from "express";
const httpStatus = require("http-status");
const { getDB } = require("../mongodb.connect");
const { UserModel } = require("../models/user.model");
const connectMySQL = require('../mysql.connect');

// MYSQL
const getUserHasPasswordLengthGreaterThan6SQL = async (req: Request, res: Response) => {
    connectMySQL.query('SELECT * FROM USERS WHERE CHAR_LENGTH(PASSWORD) > 6 ', async (err: any, rows: any) => {
        if (err) res.status(httpStatus.BAD_REQUEST).send("Something wrong!");

        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        console.log(result);
        res.status(httpStatus.OK).send(result[0]);
    });
};

const getUserAddressInDaNangSQL = async (req: Request, res: Response) => {
    connectMySQL.query("SELECT * FROM USERS WHERE ADDRESS LIKE '%Đà Nẵng%'", async (err: any, rows: any) => {
        if (err) res.status(httpStatus.BAD_REQUEST).send("Something wrong!");

        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        console.log(result);
        res.status(httpStatus.OK).send(result);
    });
};

const updateStatusSQL = async (req: Request, res: Response) => {
    connectMySQL.query("UPDATE USERS SET STATUS = 1 WHERE CREATED < NOW()", async (err: any, rows: any) => {
        if (err) res.status(httpStatus.BAD_REQUEST).send("Something wrong!");

        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        console.log(result);
        res.status(httpStatus.OK).send(result);
    });
};

// mongodb
const createNewUser = async (req: Request, res: Response) => {
    try {
        const result = await UserModel.createNewUser(req.body);
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        console.log("error here!");
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const result = await UserModel.getAllUsers();
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const getUserHasPasswordLengthGreaterThan6 = async (req: Request, res: Response) => {
    try {
        const result = await getDB().collection("users").find({
            "password": { "$exists": true },
            "$expr": { "$gt": [ { "$strLenCP": "$password" }, 6 ] }
        }).toArray();
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const getUserAddressInDaNang = async (req: Request, res: Response) => {
    try {
        const result = await getDB().collection("users").find({
            "address": { "$exists": true },
            "$expr": { 
                "$regexMatch": { 
                    "input": "$address", 
                    "regex": "Đà Nẵng", 
                    "options": "i" 
                } 
            }
        }).toArray();
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const result = await getDB().collection("users").update(
            { 
                "address": { "$exists": true }, 
                created: { $lt: Date.now() }
            },
            { $set: { status: 1 } }
        );
        res.status(httpStatus.OK).send(result);
    } catch (err: any) {
        res.status(httpStatus.BAD_REQUEST).send("Something wrong!");
    }
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserHasPasswordLengthGreaterThan6,
    getUserAddressInDaNang,
    updateUserStatus,
    getUserHasPasswordLengthGreaterThan6SQL,
    getUserAddressInDaNangSQL,
    updateStatusSQL
}
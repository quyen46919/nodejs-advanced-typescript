const { MongoClient } = require('mongodb');
// import types
import * as mongoDB from "mongodb";

let dbInstance: mongoDB.Db;

export const mongodbConnect = async () => {
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        dbInstance = client.db(process.env.DATABASE_NAME);
    } catch (err) {
        throw new Error('Failed to connect!');
    }
};

export const getDB = () => {
    if (!dbInstance) throw new Error('Disconnected to database!');
    return dbInstance;
}
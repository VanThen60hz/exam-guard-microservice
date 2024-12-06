"use strict";

const mongoose = require("mongoose");
const {
    db: { host, name, port },
} = require("../configs/mongodb.config");

const connectString = `mongodb://${host}:${port}/${name}`;
// const connectString = process.env.MONGODB_URI;

const { countConnect } = require("../helpers/check.connect");

class Database {
    constructor() {
        this._connect();
    }

    _connect(type = "mongodb") {
        //dev
        if (1 != 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        mongoose
            .connect(connectString, {
                maxPoolSize: 50,
            })
            .then((_) => {
                console.log("MongoDB connection successful");
                countConnect();
            })
            .catch((err) => {
                console.error("Database connection error: " + err);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;

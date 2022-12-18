const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.join(__dirname, '../models/');
const db = {};
let sequelize = null;

const dbConnection = async () => {

    try {

        sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_TYPE
        });

        fs
        .readdirSync(basename)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
        })
        .forEach(file => {
            const model = require(path.join(basename, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });

        await sequelize.sync({ force: false });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        console.log("DB Online");

    } catch (error) {
        console.log(error);
        throw new Error("Error with the database");
    }

}

db.dbConnection = dbConnection;

module.exports = db;
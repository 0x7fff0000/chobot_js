const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

module.exports = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    storage: dbConfig.storage
});

const { parse } = require('../util/dotenv');

module.exports = {
    dialect: parse(process.env.DB_DIALECT),

    host: parse(process.env.DB_HOST),
    user: parse(process.env.DB_USER),
    password: parse(process.env.DB_PASSWORD),
    name: parse(process.env.DB_NAME),
    
    logging: parse(process.env.DB_LOGGING),
    storage: parse(process.env.DB_STORAGE),

    force_sync: parse(process.env.DB_FORCE_SYNC)
};

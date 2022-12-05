const { parse } = require('../util/dotenv');

module.exports = {
    token: parse(process.env.TOKEN),
    client_id: parse(process.env.CLIENT_ID),
    guild_id: parse(process.env.GUILD_ID)
};

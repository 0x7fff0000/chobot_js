const { DataTypes, Model } = require('sequelize');

class Song extends Model {}

Song.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    guildId: {
        type: DataTypes.STRING
    },
    memberId: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    played: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'songs',
    timestamps: true,
    sequelize: global.sequelize
});

module.exports = Song;

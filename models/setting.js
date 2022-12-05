const { DataTypes, Model } = require('sequelize');

class Setting extends Model {}

Setting.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    guildId: {
        type: DataTypes.STRING
    },
    key: {
        type: DataTypes.STRING,
        unique: true
    },
    value: {
        type: DataTypes.STRING
    },
    details: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'settings',
    timestamps: true,
    sequelize: global.sequelize,
    indexes: [
        {
            unique: true,
            fields: ['guildId', 'key']
        }
    ]
});

Setting.get = async (guildId, key, def = null, bCreateWithDefault = false) => {
    const setting = await Setting.findOne({
        where: {
            guildId,
            key
        }
    });

    if (setting) {
        return setting;
    } else if (!bCreateWithDefault) {
        return def;
    }

    return await Setting.create({
        guildId,
        key,
        value: def
    });
}

module.exports = Setting;

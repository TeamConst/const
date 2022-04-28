const Sequelize = require("sequelize");

module.exports = class BuyMusic extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                sellCount: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                sellComplete: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                currentOwner: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Buymusic",
                tableName: "buymusic",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.BuyMusic.belongsTo(db.Music, {
            foreignKey: "CID",
            as: "BuyMusic_CID",
        });
    }
};

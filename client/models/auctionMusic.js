const Sequelize = require("sequelize");

module.exports = class AuctionMusic extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                currentPrice: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                currentOwner: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                currentWinner: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                lastWinner: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                    defaultValue: "NotYet",
                },
                auctionCount: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                auctionComplete: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: "Auctionmusic",
                tableName: "auctionmusic",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.AuctionMusic.belongsTo(db.Music, {
            foreignKey: "CID",
            as: "AuctionMusic_CID",
        });
    }
};

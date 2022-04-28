const Sequelize = require("sequelize");

module.exports = class LikeMusic extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                like: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: "Likemusic",
                tableName: "likemusic",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.LikeMusic.belongsTo(db.User, {
            foreignKey: "address",
            as: "LikeMusic_address",
        });
        db.LikeMusic.belongsTo(db.Music, {
            foreignKey: "CID",
            as: "LikeMusic_CID",
        });
    }
};

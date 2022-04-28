const Sequelize = require("sequelize");

module.exports = class LikeArtist extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id2: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                like: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: "Likeartist",
                tableName: "likeartist",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.LikeArtist.belongsTo(db.User, {
            foreignKey: "address",
            as: "LikeArtist_address",
        });
    }
};

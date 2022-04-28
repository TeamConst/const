const Sequelize = require("sequelize");

module.exports = class BookmarkMusic extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                bookmark: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: "Bookmarkmusic",
                tableName: "bookmarkmusic",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.BookmarkMusic.belongsTo(db.User, {
            foreignKey: "address",
            as: "BookmarkMusic_address",
        });
        db.BookmarkMusic.belongsTo(db.Music, {
            foreignKey: "CID",
            as: "BookmarkMusic_CID",
        });
    }
};

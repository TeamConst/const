const Sequelize = require("sequelize");

module.exports = class MyMusic extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                CID: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    defaultValue: "NotYetUpdate",
                },
                // user, music 연동하고
                myplayTime: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                myplayCount: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                mylikeMusic: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                mybookmarkMusic: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                modelName: "Mymusic",
                tableName: "mymusic",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.MyMusic.belongsTo(db.User, {
            foreignKey: "address",
            as: "MyMusic_address",
        });
    }
};

const Sequelize = require("sequelize");

module.exports = class TransactionDetail extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                Method: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                startingPoint: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                endingPoint: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                startingTime: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                duration: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                totalParticipant: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                currentWinner: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Transactiondetail",
                tableName: "transactiondetail",
                timestamps: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.TransactionDetail.belongsTo(db.Music, {
            foreignKey: "CID",
            as: "TransactionDetail_CID",
        });
    }
};

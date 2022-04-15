const Sequelize = require("sequelize");

module.exports = class TransactionDetail extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        CID: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        Method: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        startingPoint: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        endingPoint: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        startingTime: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        endingTime: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        totalParticipant: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "TransactionDetail",
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
      targetKey: "CID",
    });
  }
};

const Sequelize = require("sequelize");

module.exports = class Auction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(45),
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "Auction",
        tableName: "auction",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Auction.belongsTo(db.User, {
      foreignKey: "address",
      targetKey: "address",
    });
  }
};

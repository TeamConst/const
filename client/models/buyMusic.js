const Sequelize = require("sequelize");

module.exports = class BuyMusic extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        CID: {
          type: Sequelize.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
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
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "BuyMusic",
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
      targetKey: "CID",
    });
  }
};

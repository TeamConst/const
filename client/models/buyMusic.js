const Sequelize = require("sequelize");

module.exports = class BuyMusic extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        CID: {
          type: Sequelize.STRING(100),
          allowNull: false,
          primaryKey: true,
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

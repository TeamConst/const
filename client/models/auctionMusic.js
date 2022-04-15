const Sequelize = require("sequelize");

module.exports = class AuctionMusic extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        CID: {
          type: Sequelize.STRING(100),
          allowNull: true,
          primaryKey: true,
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
      targetKey: "CID",
    });
  }
};

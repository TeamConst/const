const Sequelize = require("sequelize");

module.exports = class AuctionData extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        mintby: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        CID: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "AuctionData",
        tableName: "auctionData",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // Music.belongsTo(db.Artist, {
    //   foreignKey: "artist_idArtist",
    //   // sourceKey: "artist_idArtist_artist",
    //   sourceKey: "id",
    // });
    // Music.belongsTo(db.User, {
    //   foreignKey: "artist_idArtist",
    //   sourceKey: "id",
    // });
  }
};

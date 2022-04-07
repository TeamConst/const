
   
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
        auction: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        Contract: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        tokenID: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        accountAddress: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        currentTime: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING(45),
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
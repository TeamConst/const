const Sequelize = require("sequelize");

module.exports = class Auction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
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

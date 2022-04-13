const Sequelize = require("sequelize");
module.exports = class Artist extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idArtist: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        AuctionRight: {
          type: Sequelize.INTEGER(45),
          allowNull: true,
        },
        LikeArtist: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Artist",
        tableName: "artist",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // Artist.belongsTo(db.User, {
    //   foreignKey: "user_idUser",
    //   // sourceKey: "user_idUser_user",
    //   sourceKey: "id",
    // });
    // Artist.hasMany(db.Music, {
    //   foreignKey: "artist_idArtist",
    //   // sourceKey: "musics",
    //   // sourceKey: "id",
    // });
  }
};

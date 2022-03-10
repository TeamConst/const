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
        nickname: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: "nickname_UNIQUE",
        },
        AuctionRight: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_idUser: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "user",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "artist",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "idArtist" }],
          },
          {
            name: "nickname_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [{ name: "nickname" }],
          },
          {
            name: "fk_artist_user1_idx",
            using: "BTREE",
            fields: [{ name: "user_idUser" }],
          },
        ],
      }
    );
  }
  static associate(db) {
    db.Artist.hasMany(db.Music, {
      foreignKey: "artist_idArtist",
      sourceKey: "musics",
    });
    db.Artist.belongsTo(db.User, {
      foreignKey: "user_idUser",
      sourceKey: "user_idUser_user",
    });
  }
};

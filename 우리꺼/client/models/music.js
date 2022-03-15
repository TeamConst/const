const Sequelize = require("sequelize");

module.exports = class Music extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idMusic: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        release: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        genre: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        composer: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        lyricist: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        artist_idArtist: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "artist",
            key: "idArtist",
          },
        },
        playTime: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        playCount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        LikeMusic: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "music",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "idMusic" }, { name: "artist_idArtist" }],
          },
          {
            name: "fk_music_artist1_idx",
            using: "BTREE",
            fields: [{ name: "artist_idArtist" }],
          },
        ],
      }
    );
  }
  static associate(db) {
    Music.belongsTo(db.Artist, {
      foreignKey: "artist_idArtist",
      // sourceKey: "artist_idArtist_artist",
      sourceKey: "id",
    });
  }
};

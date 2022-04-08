const Sequelize = require("sequelize");

module.exports = class MyMusic extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        // user, music 연동하고
        myplayTime: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        myplayCount: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "MyMusic",
        tableName: "mymusic",
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

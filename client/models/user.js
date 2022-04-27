const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        address: {
          type: Sequelize.STRING(200),
          allowNull: false,
          primaryKey: true,
        },
        id2: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        artist: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nation: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        favor_genre: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        ticket: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: "이용권 없음",
        },
        ticketTime: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue: "0",
        },
        profileImg: {
          type: Sequelize.STRING(200),
          allowNull: false,
          defaultValue:
            "https://yagom.net/wp-content/uploads/avatars/68/5e790a5b49694-bpthumb.png",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Music, {
      foreignKey: "address",
      sourceKey: "address",
    });
    db.User.hasMany(db.MyMusic, {
      foreignKey: "address",
      sourceKey: "address",
    });
    db.User.hasMany(db.BookmarkMusic, {
      foreignKey: "address",
      sourceKey: "address",
    });
    db.User.hasMany(db.LikeMusic, {
      foreignKey: "address",
      sourceKey: "address",
    });
    db.User.hasMany(db.LikeArtist, {
      foreignKey: "address",
      sourceKey: "address",
    });
  }
};

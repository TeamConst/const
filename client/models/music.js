const Sequelize = require("sequelize");

module.exports = class Music extends Sequelize.Model {
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
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        s3: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        artist: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        albumName: {
          type: Sequelize.STRING(45),
          allowNull: true,
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
        playTime: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        playCount: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        LikeMusic: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        view: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        CID: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "NotYetUpdate",
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "Music",
        tableName: "music",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Music.belongsTo(db.User, {
      foreignKey: "address",
      targetKey: "address",
    });
    db.Music.hasMany(db.BuyMusic, {
      foreignKey: "CID",
      targetKey: "CID",
    });
  }
};

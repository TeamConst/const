const Sequelize = require("sequelize");

module.exports = class Music extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(45),
          allowNull: false,
          primaryKey: true,
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
        CID: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        sellCount: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        sellComplete: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        auctionComplete: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
  }
};

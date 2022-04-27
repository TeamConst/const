const Sequelize = require("sequelize");

module.exports = class BookmarkMusic extends Sequelize.Model {
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
        },
        CID: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        bookmark: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Bookmarkmusic",
        tableName: "bookmarkmusic",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.BookmarkMusic.belongsTo(db.User, {
      foreignKey: "address",
      targetKey: "address",
    });
    db.BookmarkMusic.belongsTo(db.Music, {
      foreignKey: "CID",
      targetKey: "CID",
    });
  }
};

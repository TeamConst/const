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
        artist: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        nation: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        favor_genre: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(45),
          allowNull: false,
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
    // User.hasMany(db.Artist, {
    //   sourceKey: "id",
    //   foreignKey: "user_idUser",
    // });
    // User.hasMany(db.Music, {
    //   sourceKey: "id",
    //   foreignKey: "user_idUser",
    // });
  }
};

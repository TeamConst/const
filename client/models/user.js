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
          type: Sequelize.STRING(45),
          allowNull: false,
          primaryKey: true,
        },
        id2: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        artist: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
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
        ticket: {
          type: Sequelize.STRING(45),
          allowNull: false,
          defaultValue: "이용권 없음",
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
  }
};

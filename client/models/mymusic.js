const Sequelize = require("sequelize");

module.exports = class MyMusic extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(45),
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
        modelName: "Mymusic",
        tableName: "mymusic",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Mymusic.belongsTo(db.User, {
      foreignKey: "address",
      targetKey: "address",
    });
  }
};

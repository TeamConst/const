const Sequelize = require("sequelize");

module.exports = class Music extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                CID: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    defaultValue: "NotYetUpdate",
                    primaryKey: true,
                },
                s3: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                title: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                artist: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                albumName: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                release: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                genre: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                composer: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                lyricist: {
                    type: Sequelize.STRING(200),
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
                bookmarkMusic: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                view: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
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
            as: "Music_address",
        });
        db.Music.hasMany(db.LikeMusic, {
            foreignKey: "CID",
            as: "LikeMusic_CID",
        });
        db.Music.hasMany(db.BookmarkMusic, {
            foreignKey: "CID",
            as: "BookmarkMusic_CID",
        });
        db.Music.hasMany(db.BuyMusic, {
            foreignKey: "CID",
            as: "BuyMusic_CID",
        });
        db.Music.hasMany(db.AuctionMusic, {
            foreignKey: "CID",
            as: "AuctionMusic_CID",
        });
        db.Music.hasMany(db.TransactionDetail, {
            foreignKey: "CID",
            as: "TransactionDetail_CID",
        });
    }
};

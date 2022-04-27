const path = require("path");
const Sequelize = require("sequelize");

// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require("../config/config.json")[env];
const config = require("../config/config.js");

// Model 불러오기
const User = require("./user");
const Music = require("./music");
const MyMusic = require("./mymusic");
const LikeArtist = require("./likeArtist");
const LikeMusic = require("./likeMusic");
const BookmarkMusic = require("./bookmarkMusic");

const AuctionData = require("./auctiondata");
const AuctionMusic = require("./auctionMusic");
const BuyMusic = require("./buyMusic");
const TransactionDetail = require("./transactionDetail");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.User = User;
db.Music = Music;
db.MyMusic = MyMusic;
db.LikeArtist = LikeArtist;
db.LikeMusic = LikeMusic;
db.BookmarkMusic = BookmarkMusic;

db.BuyMusic = BuyMusic;
db.AuctionMusic = AuctionMusic;
db.TransactionDetail = TransactionDetail;
db.AuctionData = AuctionData;

// db.Like = Like;
User.init(sequelize);
Music.init(sequelize);
MyMusic.init(sequelize);
LikeArtist.init(sequelize);
LikeMusic.init(sequelize);
BookmarkMusic.init(sequelize);

AuctionData.init(sequelize);
BuyMusic.init(sequelize);
AuctionMusic.init(sequelize);
TransactionDetail.init(sequelize);

User.associate(db);
Music.associate(db);
MyMusic.associate(db);
LikeArtist.associate(db);
LikeMusic.associate(db);
BookmarkMusic.associate(db);

AuctionData.associate(db);
BuyMusic.associate(db);
AuctionMusic.associate(db);
TransactionDetail.associate(db);
// Like.associate(db);

module.exports = db;

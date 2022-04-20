const path = require("path");
const Sequelize = require("sequelize");

// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require("../config/config.json")[env];
const config = require("../config/config.js");

// Model 불러오기
const User = require("./user");
const Music = require("./music");
const Artist = require("./artist");
const AuctionData = require("./auctiondata");
const MyMusic = require("./mymusic");
const AuctionMusic = require("./auctionMusic");
const BuyMusic = require("./buyMusic");
const TransactionDetail = require("./transactionDetail");

// const Like = require("./like");

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
db.Artist = Artist;
db.MyMusic = MyMusic;
db.BuyMusic = BuyMusic;
db.AuctionMusic = AuctionMusic;
db.TransactionDetail = TransactionDetail;
db.AuctionData = AuctionData;

// db.Like = Like;
User.init(sequelize);
Artist.init(sequelize);
Music.init(sequelize);
AuctionData.init(sequelize);
MyMusic.init(sequelize);
BuyMusic.init(sequelize);
AuctionMusic.init(sequelize);
TransactionDetail.init(sequelize);
// Like.init(sequelize);

User.associate(db);
Artist.associate(db);
Music.associate(db);
AuctionData.associate(db);
MyMusic.associate(db);
BuyMusic.associate(db);
AuctionMusic.associate(db);
TransactionDetail.associate(db);
// Like.associate(db);

module.exports = db;

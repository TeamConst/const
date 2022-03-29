const path = require("path");
const Sequelize = require("sequelize");

// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

// Model 불러오기
const User = require("./user");
const Music = require("./music");
const Artist = require("./artist");
const Auction = require("./auction");
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
db.Auction = Auction;

// db.Like = Like;
User.init(sequelize);
Artist.init(sequelize);
Music.init(sequelize);
Auction.init(sequelize);
// Like.init(sequelize);

User.associate(db);
Artist.associate(db);
Music.associate(db);
Auction.associate(db);
// Like.associate(db);

module.exports = db;

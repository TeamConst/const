const { sequelize } = require("./models/index.js");
const User = require("./models/user");
const Music = require("./models/music");
const MyMusic = require("./models/mymusic");
const LikeArtist = require("./models/likeArtist");
const LikeMusic = require("./models/likeMusic");
const BookmarkMusic = require("./models/bookmarkMusic");

const AuctionData = require("./models/auctiondata");
const BuyMusic = require("./models/buyMusic");
const AuctionMusic = require("./models/auctionMusic");
const TransactionDetail = require("./models/transactionDetail");

// DB와 연결
sequelize
    // sync : MySQL에 테이블이 존재 하지 않을때 생성
    //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
    .sync({ force: false })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error(err);
    });

async function B() {
    await User.create({
        address: 1,
        id2: 2,
        artist: 3,
        password: 4,
        name: 5,
        nation: 6,
        favor_genre: 8,
        ticket: 9,
        ticketTime: 10,
        profileImg: 11,
    });
}
async function A() {
    await Music.create({
        CID: 4,
        s3: 2,
        title: 3,
        artist: 4,
        albumName: 5,
        release: 6,
        genre: 7,
        composer: 8,
        lyricist: 9,
        playTime: 10,
        playCount: 5,
        LikeMusic: 5,
        bookmarkMusic: 4,
        view: 5,
        address: 3,
    });
}

A();
// B();

const WebSocket = require("ws");

const next = require("next");
const { parse } = require("url");
const express = require("express");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");
const path = require("path");

// 암호화
const bcrypt = require("bcrypt");

// 시퀄라이즈 연결
const { sequelize } = require("./models/index.js");
const User = require("./models/user");
const Music = require("./models/music");
const AuctionData = require("./models/auctiondata");
const MyMusic = require("./models/mymusic");
const BuyMusic = require("./models/buyMusic");
const AuctionMusic = require("./models/auctionMusic");
const TransactionDetail = require("./models/transactionDetail");

// 쿠키, 세션 설정
const cookieParser = require("cookie-parser");
const session = require("express-session");

// cors 설정
const cors = require("cors");

// passport 설정
const passport = require("passport");
const passportConfig = require("./passport");

// 미들웨어
const { isLoggedIn, isNotLoggedIn } = require("./routers/middlewares.js");

// 라우터 선언
const indexRouter = require("./routers/index.js");
// const authRouter = require("./routers/auth");
// const apisRouter = require("./routers/apis/index");
// const blockRouter = require("./routers/apis/block");
// 모든 URL에 대한 Router
const otherRouter = require("./routers/other.js");

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

// nextjs는 아래 안써줘도 된다
// URL과 라우터 매칭
// app.use("/", indexRouter);
// app.use("/auth", authRouter);
// app.use("/apis", apisRouter);
// app.use("/apis/block", blockRouter);

// ERROR 메세지 창
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   // logger.info("hello");
//   // logger.error(error.message);
//   next(error);
// });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
//   res.status(err.status || 500);
//   res.render("error");
// });

// app.use(otherRouter);

// PORT 연결상태 확인
// app.listen(app.get("port"), () =>
//   console.log(`Listening on port ${app.get("port")}`)
// );

// express, next 설정
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

// production 설정
// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("combined"));
//   app.use(helmet());
//   app.use(hpp());
// } else {
//   app.use(morgan("dev"));
// }

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // const ioServer = require("http").createServer(server);
  // const io = require("socket.io")(ioServer, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"],
  //   },
  // });
  // io.on("connection", (client) => {
  //   client.on("first Request", (req) => {
  //     console.log(req);
  //     client.emit("first Respond", { data: "firstRespond" });
  //   });
  //   client.on("successAuction", (req) => {
  //     console.log(req);
  //     console.log("나오면 성공");
  //     client.broadcast.emit("refreshAuction", {});
  //   });

  //   client.on("event", (data) => {
  //     /* … */
  //     // client.broadcast.emit("이벤트이름", {
  //     //   data: "나를 제외한 다른 클라이언트",
  //     // });
  //   });
  //   client.on("disconnect", () => {
  //     /* … */
  //   });
  // });
  // ioServer.listen(3000);

  // req.session 객체 생성
  const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    // redis저장 설정
    // store: new RedisStore({ client: redisClient }),
  };
  if (process.env.NODE_ENV === "production") {
    sessionOption.proxy = true;
    // sessionOption.cookie.secure = true;
  }
  server.use(session(sessionOption));

  // passport setting
  passportConfig();
  // passport 설정 선언(req에 passport 설정 삽입) 위 use.session이라고 보면 댐
  server.use(passport.initialize());
  // req.session 에 passport 정보 저장 (req.session.num = 1 이런거라고 보면 댐)
  server.use(passport.session());

  // 이거 어따씀?
  // app.use("/", express.static(path.join(__dirname, "./build")));

  // const parsedUrl = parse(req.url, true);
  server.use(cors());
  server.use(fileUpload());
  server.use(express.json({ limit: "50mb" }));
  server.use(
    express.urlencoded({
      limit: "50mb",
      extended: false,
      parameterLimit: 1000000,
    })
  );
  server.use(cookieParser(process.env.COOKIE_SECRET));

  // multer, req.files 예제
  // server.post("/upload", function (req, res, next) {
  //   console.log("들어옴?");
  //   res.send("Successfully uploaded " + req.file.length + " files!");
  // });

  // server.post("/upload", upload.single("picture"), (req, res) => {
  //   res.json("업로드 오케이");
  // });

  // 라우팅 처리
  // 민팅 한번에 처리
  // 사실 지금 music 컴포넌트에 이게 이미 하고 있어서 나중에 로직 결정을 해야함
  server.post("/api/mint", async (req, res) => {
    const parse = JSON.parse(req.body.db);

    console.log("민트 데이터");
    console.log(parse);
    await Music.create(parse);

    // ipfs-http-client 라이브러리 사용안하고 연결해도 됨. docs 참고
    const ipfsClient = require("ipfs-http-client");

    // 개인 id, secret
    const projectId = "26fkdqdZ9VBjWP310ZLH3ZUkb5T";
    const projectSecret = "9c05a2839dd121251b98ed30be561824";
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = await ipfsClient.create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    // console.log(req.files);
    // 파일과 그에 대한 메타데이터를 같이 저장해야 해야 좋을 것 같음
    const ipfsUpload = {
      // path: req.files.musics.name,
      content: req.files.musics.data,
    };

    await client.add(ipfsUpload).then(async (res) => {
      console.log(res);
      const s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${res.path}.jpg`;
      await Music.update(
        { s3: s3, CID: res.path },
        { where: { title: parse.title } }
      );
    });

    const metadata = {
      name: req.files.musics.name,
      mimetype: req.files.musics.mimetype,
      size: req.files.musics.size,
      encoding: req.files.musics.encoding,
    };

    const { Readable } = require("stream");
    const src = Readable.from(JSON.stringify(metadata));

    await client.add(src).then((res) => {
      console.log(res);
    });

    res.send("민트 최종 ok");
  });

  server.post("/api/mint/image", async (req, res) => {
    // multer, s3
    const AWS = require("aws-sdk");
    const multer = require("multer");
    const multerS3 = require("multer-s3");

    // Set the AWS Region
    const REGION = "ap-northeast-2"; //REGION
    const IDENTITY_POOL_ID =
      "ap-northeast-2:ee62d023-c180-46bf-9e24-935ff2fa2b5a";
    const BucketName = "const123";

    AWS.config.update({
      region: REGION,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });

    // credentials: new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: IDENTITY_POOL_ID,
    // }),

    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: BucketName },
    });

    s3.getBucketAcl(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else if (data) {
        console.log("Success", data.Grants);
      }
    });

    // let policyParams = { ACL: "public - read" };
    // s3.putBucketAcl(policyParams, function (err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else console.log(data); // successful response
    // });

    // 일단 jpg로 한정 짓지만 이에대한 정확한 설계가 필요하다
    let uploadParams = {
      Body: req.files.image.data,
      Key: "image/" + req.body.CID + ".jpg",
      ACL: "public-read",
    };

    await s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
      }
    });

    // const upload = multer({
    //   storage: multerS3({
    //     s3: s3,
    //     bucket: BucketName,

    //     // metadata: function (req, file, cb) {
    //     //   cb(null, { fieldName: file.fieldname });
    //     // },
    //     // key: function (req, file, cb) {
    //     //   cb(null, Date.now().toString());
    //     // },

    //     contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
    //     acl: "public-read",
    //     key: (req, file, cb) => {
    //       let extension = path.extname(file.originalname);
    //       cb(null, "const/" + Date.now().toString() + extension);
    //     },
    //   }),
    //   limits: { fileSize: 5 * 1024 * 1024 },
    // });

    // console.log(req.file);

    res.send("민트 S3 OK");
  });

  // 로컬 DB 민팅
  // server.post("/api/mint/gg", async (req, res) => {
  //   await Music.create(req.body);
  //   res.send("민트 mysql OK");
  // });

  // 음원 민팅
  // server.post("/api/mint/musics", async (req, res) => {
  //   // ipfs-http-client 라이브러리 사용안하고 연결해도 됨. docs 참고
  //   const ipfsClient = require("ipfs-http-client");

  //   // 개인 id, secret
  //   const projectId = "26fkdqdZ9VBjWP310ZLH3ZUkb5T";
  //   const projectSecret = "9c05a2839dd121251b98ed30be561824";
  //   const auth =
  //     "Basic " +
  //     Buffer.from(projectId + ":" + projectSecret).toString("base64");

  //   // ipfs 연결
  //   const client = await ipfsClient.create({
  //     host: "ipfs.infura.io",
  //     port: 5001,
  //     protocol: "https",
  //     headers: {
  //       authorization: auth,
  //     },
  //   });

  //   // 파일과 그에 대한 메타데이터를 같이 저장해야 해야 좋을 것 같음
  //   const ipfsUpload = {
  //     path: req.files.musics.name,
  //     content: req.files.musics.data,
  //   };

  //   await client.add(ipfsUpload).then((res) => {
  //     console.log(res);
  //   });

  //   const metadata = {
  //     name: req.files.musics.name,
  //     mimetype: req.files.musics.mimetype,
  //     size: req.files.musics.size,
  //     encoding: req.files.musics.encoding,
  //   };

  //   const { Readable } = require("stream");
  //   const src = Readable.from(JSON.stringify(metadata));

  //   await client.add(src).then((res) => {
  //     console.log(res);
  //   });

  //   res.send("음원 민팅 성공");
  // });

  // Get 처리
  server.get("/api/bestCollection", (req, res) => {
    // multer, s3
    const AWS = require("aws-sdk");
    const multer = require("multer");
    const multerS3 = require("multer-s3");

    // Set the AWS Region
    const REGION = "ap-northeast-2"; //REGION
    const IDENTITY_POOL_ID =
      "ap-northeast-2:ee62d023-c180-46bf-9e24-935ff2fa2b5a";
    const BucketName = "const123";

    AWS.config.update({
      region: REGION,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });

    // credentials: new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: IDENTITY_POOL_ID,
    // }),

    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: BucketName },
    });

    // Call S3 to obtain a list of the objects in the bucket
    //  앨범명, 개수 등의 파라미터를 적는 곳을 찾아야함 아직 모름
    s3.listObjects(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        const result = data.Contents;

        for (i = 0; i < result.length; i++) {
          result[i].URL =
            "https://const123.s3.ap-northeast-2.amazonaws.com/" + result[i].Key;
        }
        console.log("Success");
        res.json(result);
      }
    });
  });

  // 좋아요 수 처리
  server.post("/api/upLike", async (req, res) => {
    // const result = await Music.findAll();
    // const data = await Music.findOne({ title: req.body.name });
    // res.json(data);
    const CID = Object.keys(req.body);
    const read = await Music.findOne({ where: { CID: CID } });
    await Music.update(
      { LikeMusic: read.LikeMusic + 1 },
      { where: { title: title } }
    );
    res.send("업하트 오케");
  });

  server.post("/api/upLike2", async (req, res) => {
    const a = req.body.CID;
    const read = await Music.findOne({ where: { CID: a } });
    await Music.update(
      { LikeMusic: read.LikeMusic + 1 },
      { where: { CID: a } }
    );
    res.send("좋아요 올리기 성공");
  });

  server.post("/api/upView", async (req, res) => {
    const a = req.body.CID;
    const read = await Music.findOne({ where: { CID: a } });
    await Music.update({ view: read.view + 1 }, { where: { CID: a } });
    res.send("조회수 올리기 성공");
  });

  // 내가 하는 행동 처리
  server.post("/api/myPlayCount", async (req, res) => {
    const CID = Object.keys(req.body);
    // 세션으로 받자
    const read = await MyMusic.findOne({
      where: { address: req.session.address, CID: CID },
    });

    if (!read) {
      await MyMusic.create({
        address: req.session.address,
        CID: CID,
        myplayCount: 1,
      });
    } else {
      await MyMusic.update(
        { myplayCount: read.myplayCount + 1 },
        { where: { CID: CID } }
      );
    }
    res.send("myPlayCount Success!");
  });

  // 구매, 판매 페이지 입장시
  server.post("/api/buydetail", async (req, res) => {
    const a = req.body.name.split("/");
    const b = a[1];
    const c = b.split(".");
    const d = c[0];

    // 경매 불러와야대
    const mu = await Music.findOne({ where: { CID: d } });
    // const ac = await Auction.findOne({ where: { CID: d } });

    // console.log(mu, ac);
    // const result = { ...mu, ...ac };

    // const data = await Music.findOne({ title: req.body.name });

    res.json(mu);
  });

  // 상품 주인 찾아내기
  server.post("/api/getWho", async (req, res) => {
    const a = req.body.name.split("/");
    const b = a[1];
    const c = b.split(".");
    const d = c[0];

    // CID로 검색을 해야되니까
    const who = await Music.findOne({ where: { CID: d } });
    res.json(who);
  });

  // 회원가입 일단, 어드레스만 트러플에 넣고 나머지는 Mysql에 넣도록 하겠다
  // 그리고 블록체인이니까 계정 중복 등의 고려는 우선 하지 않도록 하겠다
  server.post("/api/signup", isNotLoggedIn, async (req, res, next) => {
    try {
      const body = await req.body;
      console.log(req.body.password);
      const hash = await bcrypt.hash(req.body.password, 12);
      body.password = hash;
      const data = await User.create(body);

      res.send("회원가입 완료");
    } catch (error) {
      // res.send(err);
      console.error(error);
      next(error);
    }
  });

  server.post("/api/login", isNotLoggedIn, async (req, res, next) => {
    try {
      // passport를 이용하면 req.session 객체에 정보를 넣는게 쉬워서 사용하는 것이다.
      // localStrategy로 감
      passport.authenticate("local", (authError, user, info) => {
        // 서버에러 시
        if (authError) {
          console.error(authError);
          return next(authError);
        }
        if (!user) {
          return res.redirect(`/?loginError=${info.message}`);
        }
        //req.login이 serializeUser 실행
        return req.login(user, (loginError) => {
          if (loginError) {
            console.error(loginError);
            return next(loginError);
          }
          res.json(req.user);
          // return res.redirect("/");
        });
      })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
    } catch {
      console.log("얘도 확인");
    }
  });

  server.get("/api/getUserSession", isLoggedIn, (req, res) => {
    res.json(req.user);
  });

  server.get("/api/logout", isLoggedIn, (req, res) => {
    console.log("뜸?");
    req.logout();
    req.session.destroy();
    // res.redirect("/");
    res.send("로그아웃 완료");
  });

  // 이용권
  server.post("/api/updateuser", async (req, res) => {
    console.log(req.body.id);
    console.log(req.body.ticket);

    try {
      const updateCondition = await User.update(
        {
          ticket: req.body.ticket,
        },
        {
          where: { id: req.body.id },
        }
      );

      res.status(200).json({ success: true, updateCondition });
    } catch (error) {
      console.error(error);
      return res.status(400).send(err);
    }
  });

  // 현재 진행중인 데이터 로컬 db 간략화
  server.get("/api/getNowBuy", async (req, res) => {
    const abc = await BuyMusic.findAll({ where: { sellComplete: false } });
    res.json(abc);
  });

  server.get("/api/getNowAuction", async (req, res) => {
    const abc = await AuctionMusic.findAll({
      where: { auctionComplete: false },
    });
    res.json(abc);
  });

  server.get("/api/getMyNFTDB", async (req, res) => {
    const abc = await Music.findAll({ where: { address: req.user.address } });
    res.json(abc);
  });

  server.get("/api/getMyBuyDB", async (req, res) => {
    const abc = await Music.findAll({ where: { address: req.user.address } });
    res.json(abc);
  });

  server.get("/api/getMyAuctionDB", async (req, res) => {
    const abc = await Music.findAll({ where: { address: req.user.address } });
    res.json(abc);
  });

  // 음악 컴포넌트 음악 정보 불러오기
  server.get("/api/getMusics", async (req, res) => {
    const result = await Music.findAll();

    res.json(result);
  });
  // 현재 진행중인 데이터 로컬 db 간략화 끝

  // 컨트랙트 불러오기
  server.get("/api/getNFT", async (req, res) => {
    const abc = await getNFT();
    res.json(abc);
  });

  server.get("/api/getBuy", async (req, res) => {
    const abc = await getBuy();
    res.json(abc);
  });

  server.get("/api/getAuction", async (req, res) => {
    const abc = await getAuction();
    res.json(abc);
  });

  server.get("/api/getContract", async (req, res) => {
    const NFTInstance = await getAuctionDataContract();

    console.log(NFTInstance);
    res.send("1");
    // res.json(NFTInstance);
  });
  // 컨트랙트 불러오기 끝

  // My : 컨트랙트에서 불러오기
  server.post("/api/getMyNFT", async (req, res) => {
    const a = req.body.name;

    const abc = await getMyNFT(a);
    res.json(abc);
  });

  server.post("/api/getMyBuy", async (req, res) => {
    const a = req.body.name;

    console.log("이거는", a);
    const abc = await getMyBuy(a);

    res.json(abc);
  });

  server.post("/api/getMyAuction", async (req, res) => {
    const a = req.body.name;

    console.log("이거는", a);
    const abc = await getMyAuction(a);

    res.json(abc);
  });
  // My : 컨트랙트에서 불러오기 끝

  // 오퍼 처리
  server.post("/api/setBuyOffer", async (req, res) => {
    const a = req.body;

    console.log(a);

    // CID로 검색을 해야되니까
    await BuyMusic.create({
      sellComplete: false,
      CID: req.body.CID,
      currentOwner: req.body.address,
      price: req.body.price,
    });

    res.send("setBuyOffer success");
  });
  // 오퍼 처리 끝

  // setBuy.js;
  server.post("/api/setBuy", async (req, res) => {
    const a = req.body.name;
    // const b = a[1];
    // const c = b.split(".");
    // const d = c[0];

    const abc = await setBuy(a);
    res.json(abc);
    // res.send("ok");
  });

  server.post("/api/getOffer", async (req, res) => {
    const a = req.body.name;
    const abc = await getOffer(a);

    res.json(abc);
  });

  server.post("/api/getBuyDB", async (req, res) => {
    const a = req.body.name;
    // const b = a[1];
    // const c = b.split(".");
    // const d = c[0];

    const abc = await Music.findOne({ where: { CID: a } });
    res.json(abc);

    // res.send("ok");
  });

  server.post("/api/getUserDB", async (req, res) => {
    const a = req.body.name;
    // const b = a[1];
    // const c = b.split(".");
    // const d = c[0];

    const abc = await Music.findOne({ where: { CID: a } });
    const bcd = await User.findOne({ where: { address: abc.address } });
    res.json(bcd);

    // res.send("ok");
  });

  server.post("/api/getBuyMusicDB", async (req, res) => {
    const a = req.body.name;
    // const b = a[1];
    // const c = b.split(".");
    // const d = c[0];

    console.log("이거요", a);
    const abc = await BuyMusic.findOne({ where: { CID: a } });
    res.json(abc);

    // res.send("ok");
  });

  server.post("/api/setBuyDB", async (req, res) => {
    const a = req.body.name;

    // const b = a[1];
    // const c = b.split(".");
    // const d = c[0];

    await Music.update(
      { address: req.body.address },
      { where: { CID: req.body.CID } }
    );

    await BuyMusic.update(
      { sellComplete: true, currentOwner: req.body.address },
      { where: { CID: req.body.CID } }
    );

    const price = await BuyMusic.findOne(
      { price },
      { where: { CID: req.body.CID } }
    );
    const date = new Date();

    await TransactionDetail.create({
      CID: req.body.CID,
      Method: "BUY",
      price: price,
      startingTime: date,
      totalParticipant: 1,
      winner: req.body.address,
    });

    res.json("구매 성공");
  });
  // setBuy.js 끝

  // 아래는 내꺼 아님
  // 구매, 판매 페이지 입장시
  // server.post("/api/buysell", async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.body.name);
  //   const a = req.body.name.split("/");
  //   const b = a[1];
  //   const c = b.split(".");

  //   // 경매 불러와야대
  //   const mu = await Music.findOne({ where: { title: c } });
  //   const ac = await Auction.findOne({ where: { title: c } });

  //   console.log(mu, ac);
  //   const result = { ...mu, ...ac };

  //   // const data = await Music.findOne({ title: req.body.name });
  //   res.json(result);
  // });

  server.post("/api/AuctionData", async (req, res) => {
    // const result = await Music.findAll();
    // const data = await Music.findOne({ title: req.body.name });
    // res.json(data);
    const title = Object.keys(req.body);
    const read = await AuctionData.findOne({ where: { title: title } });
    await AuctionData.update(
      { Auction: read.Auction },
      { where: { title: title } }
    );

    res.send("옥션데이터 오케");
  });

  // 구매, 판매 페이지 입장시
  server.post("/api/auction", async (req, res) => {
    console.log(req.body);
    try {
      const data = await AuctionData.create({
        mintby: req.body.mintby,
        CID: req.body.CID,
      });
      res.send("옥션 DB 성공");
    } catch (err) {
      res.send(err);
    }
  });

  server.get("/api/getauction", async (req, res) => {
    const result = await AuctionData.findAll();
    // const data = await Music.findOne({ title: req.body.name });
    // res.json(data);

    res.json(result);
  });

  server.post("/api/updateauction", async (req, res) => {
    console.log(req.body.mintby);
    console.log(req.body.CID);

    try {
      const updateCondition = await AuctionData.update(
        {
          mintby: req.body.mintby,
        },
        {
          where: { CID: req.body.CID },
        }
      );

      res.status(200).json({ success: true, updateCondition });
    } catch (error) {
      console.error(error);
      return res.status(400).send(err);
    }
  });

  // server.get("/api/getBuyDataContract", async (req, res) => {
  //   const NFTInstance = await getBuyDataContract();

  //   res.json(NFTInstance);
  // });

  // 여기 보면 된다
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// 함수 모음
async function getBuyDataContract() {
  // web3
  const web3 = require("./getWeb3");

  // contract
  const contractabi = require("../build/contracts/NFTCollection.json");

  // accounts
  const accounts = await web3.eth.getAccounts();

  // networkId
  const networkId = await web3.eth.net.getId();
  const deployedAddress = contractabi.networks[networkId].address;

  // Instance
  const NFTMarketplaceInstance = new web3.eth.Contract(
    contractabi.abi,
    deployedAddress
  );

  return NFTMarketplaceInstance;
}

async function getBuyMethodContract() {
  // web3
  const web3 = require("./getWeb3");

  // contract
  const contractabi = require("../build/contracts/NFTMarketplace.json");

  // accounts
  const accounts = await web3.eth.getAccounts();

  // networkId
  const networkId = await web3.eth.net.getId();
  const deployedAddress = contractabi.networks[networkId].address;

  // Instance
  const NFTMarketplaceInstance = new web3.eth.Contract(
    contractabi.abi,
    deployedAddress
  );

  return NFTMarketplaceInstance;
}

async function getAuctionDataContract() {
  // web3
  const web3 = require("./getWeb3");

  // contract
  const contractabi = require("../build/contracts/ImageMarketplace.json");

  // accounts
  const accounts = await web3.eth.getAccounts();

  // networkId
  const networkId = await web3.eth.net.getId();
  const deployedAddress = contractabi.networks[networkId].address;

  // Instance
  const NFTMarketplaceInstance = new web3.eth.Contract(
    contractabi.abi,
    deployedAddress
  );

  return NFTMarketplaceInstance;
}

async function getNFT() {
  const Instance = await getAuctionDataContract();

  if (Instance) {
    let imagesArray = [];
    let auctionsArray = [];

    const ContractImageCount = await Instance.methods
      .currentImageCount()
      .call();
    for (let i = 1; i <= ContractImageCount; i++) {
      let image = await Instance.methods.imageStorage(i).call();
      imagesArray = [...imagesArray, image];
      // setImages((Images) => [...Images, image]);
      let auction = await Instance.methods.auctions(i).call();
      auctionsArray = [...auctionsArray, auction];
    }

    // console.log(imagesArray);
    // console.log(auctionsArray);
    // console.log(Instance);

    // 얘는 세션 처리가 날 것 같은데?
    // let ContractImageNumOfAccount = await Instance.methods
    //   .getOwnedNumber(accounts[0])
    //   .call();

    // setContract(NFTMarketplaceInstance);
    // setAccountAddress(accounts[0]);
    // setAccountBalance(balance);
    // setImageCount(ImageCount);
    // setImageNumOfAccount(ContractImageNumOfAccount);
    return imagesArray;
  }
}

// getMy : 컨트랙트에서
async function getMyNFT(data) {
  const Instance = await getAuctionDataContract();

  if (Instance) {
    let imagesArray = [];
    let auctionsArray = [];

    const ContractImageCount = await Instance.methods
      .currentImageCount()
      .call();
    for (let i = 1; i <= ContractImageCount; i++) {
      let image = await Instance.methods.imageStorage(i).call();
      if (image.currentOwner == data) {
        imagesArray = [...imagesArray, image];
      }

      // setImages((Images) => [...Images, image]);
      let auction = await Instance.methods.auctions(i).call();
      auctionsArray = [...auctionsArray, auction];
    }
    // console.log(imagesArray);
    // console.log(auctionsArray);
    // console.log(Instance);

    // 얘는 세션 처리가 날 것 같은데?
    // let ContractImageNumOfAccount = await Instance.methods
    //   .getOwnedNumber(accounts[0])
    //   .call();

    // setContract(NFTMarketplaceInstance);
    // setAccountAddress(accounts[0]);
    // setAccountBalance(balance);
    // setImageCount(ImageCount);
    // setImageNumOfAccount(ContractImageNumOfAccount);
    return imagesArray;
  }
}

async function getMyBuy(data) {
  const Instance = await getBuyDataContract();

  if (Instance) {
    const totalSupply = await Instance.methods.totalSupply().call();
    // 로드가 이게 끝인데, 왜 굳이 업데이트를 상태관리로 해놓은지 아직 이해가 안감
    // 얼마나 더 나은 결과물이길래

    let collection = [];
    for (let i = 0; i < totalSupply; i++) {
      const hash = await Instance.methods.tokenURIs(i).call();

      // console.log(hash);
      try {
        // 오류 핸들러니까 잠시 주석 처리
        const response = await fetch(
          `https://ipfs.infura.io/ipfs/${hash}?clear`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const metadata = await response.json();
        const owner = await Instance.methods.ownerOf(i + 1).call();

        console.log(owner);

        if (data == owner) {
          collection = [
            {
              id: i + 1,
              title: metadata.properties.name.description,
              img: metadata.properties.image.description,
              owner: owner,
            },
            ...collection,
          ];
        }
      } catch {
        console.error("Something went wrong");
      }
    }
    return collection;
  }
}

async function getMyAuction(data) {
  const Instance = await getAuctionDataContract();

  if (Instance) {
    let imagesArray = [];
    let offersArray = [];

    let auctionsArray = [];

    const ContractImageCount = await Instance.methods
      .currentImageCount()
      .call();

    for (let i = 1; i <= ContractImageCount; i++) {
      let image = await Instance.methods.imageStorage(i).call();
      imagesArray = [...imagesArray, image];
      // setImages((Images) => [...Images, image]);

      let offer = await Instance.methods.imageStorage(i).call();
      offersArray = [...offersArray, offer];

      let auction = await Instance.methods.auctions(i).call();
      auctionsArray = [...auctionsArray, auction];
    }

    let a = {};
    a.image = imagesArray;
    a.auction = auctionsArray;

    // console.log(imagesArray);
    // console.log(auctionsArray);
    // console.log(Instance);

    // 얘는 세션 처리가 날 것 같은데?
    // let ContractImageNumOfAccount = await Instance.methods
    //   .getOwnedNumber(accounts[0])
    //   .call();

    // setContract(NFTMarketplaceInstance);
    // setAccountAddress(accounts[0]);
    // setAccountBalance(balance);
    // setImageCount(ImageCount);
    // setImageNumOfAccount(ContractImageNumOfAccount);

    return imagesArray;
  }
}

// 기본 컨트랙트 전체 불러오기
async function getBuy() {
  const Instance = await getBuyDataContract();

  if (Instance) {
    const totalSupply = await Instance.methods.totalSupply().call();
    // 로드가 이게 끝인데, 왜 굳이 업데이트를 상태관리로 해놓은지 아직 이해가 안감
    // 얼마나 더 나은 결과물이길래

    let collection = [];
    for (let i = 0; i < totalSupply; i++) {
      const hash = await Instance.methods.tokenURIs(i).call();

      // console.log(hash);
      try {
        // 오류 핸들러니까 잠시 주석 처리
        const response = await fetch(
          `https://ipfs.infura.io/ipfs/${hash}?clear`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const metadata = await response.json();
        const owner = await Instance.methods.ownerOf(i + 1).call();

        console.log(owner);

        collection = [
          {
            id: i + 1,
            title: metadata.properties.name.description,
            img: metadata.properties.image.description,
            owner: owner,
          },
          ...collection,
        ];
      } catch {
        console.error("Something went wrong");
      }
    }
    return collection;
  }
}

async function getAuction() {
  const Instance = await getAuctionDataContract();

  if (Instance) {
    let imagesArray = [];
    let offersArray = [];
    let auctionsArray = [];

    const ContractImageCount = await Instance.methods
      .currentImageCount()
      .call();

    for (let i = 1; i <= ContractImageCount; i++) {
      let image = await Instance.methods.imageStorage(i).call();
      imagesArray = [...imagesArray, image];
      // setImages((Images) => [...Images, image]);

      let offer = await Instance.methods.imageStorage(i).call();
      offersArray = [...offersArray, offer];

      let auction = await Instance.methods.auctions(i).call();
      auctionsArray = [...auctionsArray, auction];
    }

    let a = {};
    a.image = imagesArray;
    a.auction = auctionsArray;

    // console.log(imagesArray);
    // console.log(auctionsArray);
    // console.log(Instance);

    // 얘는 세션 처리가 날 것 같은데?
    // let ContractImageNumOfAccount = await Instance.methods
    //   .getOwnedNumber(accounts[0])
    //   .call();

    // setContract(NFTMarketplaceInstance);
    // setAccountAddress(accounts[0]);
    // setAccountBalance(balance);
    // setImageCount(ImageCount);
    // setImageNumOfAccount(ContractImageNumOfAccount);

    return a;
  }
}

async function setBuy(param) {
  const Instance = await getBuyDataContract();

  if (Instance) {
    const totalSupply = await Instance.methods.totalSupply().call();
    // 로드가 이게 끝인데, 왜 굳이 업데이트를 상태관리로 해놓은지 아직 이해가 안감
    // 얼마나 더 나은 결과물이길래

    console.log(totalSupply);
    let collection = [];
    for (let i = 0; i < totalSupply; i++) {
      const hash = await Instance.methods.tokenURIs(i).call();

      // console.log(hash);
      try {
        // 오류 핸들러니까 잠시 주석 처리
        const response = await fetch(
          `https://ipfs.infura.io/ipfs/${hash}?clear`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const metadata = await response.json();
        // console.log("ipfs 불러오기", metadata);
        const owner = await Instance.methods.ownerOf(i + 1).call();
        console.log(param);
        if (metadata.properties.image.description == param) {
          console.log("떠라");
          collection = [
            {
              id: i + 1,
              title: metadata.properties.name.description,
              img: metadata.properties.image.description,
              owner: owner,
            },
            ...collection,
          ];
        }
      } catch {
        console.error("Something went wrong");
      }
    }
    return collection;
  }
}

async function getOffer(param) {
  const Instance = await getBuyMethodContract();

  if (Instance) {
    const offerCount = await Instance.methods.offerCount().call();

    console.log(offerCount);
    let offers = [];
    for (let i = 0; i < offerCount; i++) {
      const offer = await Instance.methods.offers(i + 1).call();
      offers.push(offer);

      offers.map((offer) => {
        offer.offerId = parseInt(offer.offerId);
        offer.id = parseInt(offer.id);
        offer.price = parseInt(offer.price);
      });
      // .filter(
      //   (offer) => offer.fulfilled === false && offer.cancelled === false
      // );
    }

    return offers;
  }
}
// setBuy.js 끝

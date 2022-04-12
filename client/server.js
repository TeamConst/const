const WebSocket = require("ws");

const next = require("next");
const { parse } = require("url");
const express = require("express");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");
const path = require("path");

const { sequelize } = require("./models/index.js");
const User = require("./models/user");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const cors = require("cors");

// const passport = require("passport");
// const passportConfig = require("./passport");

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

// 나머지 설정들
// req.session 객체 생성
// const sessionOption = {
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   },
//   // redis저장 설정
//   // store: new RedisStore({ client: redisClient }),
// };
// if (process.env.NODE_ENV === "production") {
//   sessionOption.proxy = true;
//   // sessionOption.cookie.secure = true;
// }
// app.use(session(sessionOption));

// passport setting
// passportConfig();
// passport 설정 선언(req에 passport 설정 삽입) 위 use.session이라고 보면 댐
// app.use(passport.initialize());
// req.session 에 passport 정보 저장 (req.session.num = 1 이런거라고 보면 댐)
// app.use(passport.session());

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
  // const webSocketServer = new WebSocket.Server({ port: 8880 });

  // webSocketServer.on("connection", function (client, req) {
  //   console.log("웹소켓 서버 연결");

  //   client.on("message", async function (data) {
  //     client.send("일단");
  //   });
  // });

  const server = express();

  const ioServer = require("http").createServer(server);
  const io = require("socket.io")(ioServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (client) => {
    client.on("first Request", (req) => {
      console.log(req);
      client.emit("first Respond", { data: "firstRespond" });
    });
    client.on("successAuction", (req) => {
      console.log(req);
      console.log("나오면 성공");
      client.broadcast.emit("refreshAuction", {});
    });

    client.on("event", (data) => {
      /* … */
      // client.broadcast.emit("이벤트이름", {
      //   data: "나를 제외한 다른 클라이언트",
      // });
    });
    client.on("disconnect", () => {
      /* … */
    });
  });
  ioServer.listen(3000);

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

  // server.post("/upload", function (req, res, next) {
  //   console.log("들어옴?");
  //   res.send("Successfully uploaded " + req.file.length + " files!");
  // });

  // server.post("/upload", upload.single("picture"), (req, res) => {
  //   res.json("업로드 오케이");
  // });

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

  const Music = require("./models/music");
  // const User = require("./models/user");
  const Auction = require("./models/auction");
  const MyMusic = require("./models/mymusic");

  server.post("/api/mint", async (req, res) => {
    const parse = JSON.parse(req.body.db);

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
      // headers: {
      //   authorization: auth,
      // },
    });

    // console.log(req.files);
    // 파일과 그에 대한 메타데이터를 같이 저장해야 해야 좋을 것 같음
    const ipfsUpload = {
      // path: req.files.musics.name,
      content: req.files.musics.data,
    };

    await client.add(ipfsUpload).then(async (res) => {
      console.log(res);
      await Music.update({ CID: res.path }, { where: { title: parse.title } });
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

  // 민트하고 나머지 정보 DB에 쏠 때
  // 노래등록, 앨범등록으로 나누어야 겠다
  server.post("/api/mint/gg", async (req, res) => {
    await Music.create(req.body);
    res.send("민트 mysql OK");
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

    console.log(req.body);
    console.log(req.files);
    await s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("sex");
        console.log(data);
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

  server.post("/api/mint/musics", async (req, res) => {
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
      // headers: {
      //   authorization: auth,
      // },
    });

    // 파일과 그에 대한 메타데이터를 같이 저장해야 해야 좋을 것 같음
    const ipfsUpload = {
      path: req.files.musics.name,
      content: req.files.musics.data,
    };

    await client.add(ipfsUpload).then((res) => {
      console.log(res);
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

    // await Music.update(req.body);

    // CID db에 저장

    // 여기서 나오는 CID를 저장하면 된다.

    // 다 저장했으니까 이제 이걸 우리 db에 하나 저장해놓고
    // 불러오면 좋을 것 같은데
    // 여기서 db저장까지 하는게 좋을 거 같은데?
    // 메타데이터가 여기서 나오니까

    // add 예시 api는 docs 참고
    // client.files.add(req.body).then((res) => {
    //   console.log(res);
    // });

    res.send("okok");
  });

  // 음악 컴포넌트 음악 정보 불러오기
  server.get("/api/getMusics", async (req, res) => {
    const result = await Music.findAll();
    // const data = await Music.findOne({ title: req.body.name });
    // res.json(data);

    res.json(result);
  });

  // 마이페이지 컴포넌트  정보 불러오기
  server.get("/api/mypage", async (req, res) => {
    // 그니까 가져올 곳이 세션, 블록, s3, ipfs 잖아 잘 맞춰보자
    // 내 이름 : web3, 아니면 db에서 web3 검색해서 아이디 찾기?
    // 생각했던 web3 연결을 여기서도 충분히 할 수 있잖아
    // 여기서 하는 걸로 우선 써보자

    // 우선, 컨트랙트 불러오기
    // 서버에서 처리하는 걸로 한번 해봤다
    //  NFT 관련 변수 한번 파악해야겠다
    const web3 = require("./getWeb3");
    const contractJSON = require("../build/contracts/ImageMarketplace.json");
    // const contractJSON = require("../build/contracts/NFTCollection.json");
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contractJSON.networks[networkId].address;
    const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress);

    const block = await web3.eth.getBlock();
    const tr = await web3.eth.getTransaction();
    const tra = await web3.eth.getTransaction(
      "0x7dd2990185d801d8c4c87bc51264671161283c955860901bf71cae3fab2dfb38"
    );
    // console.log(block);
    console.log(contract);
    console.log(tr);
    console.log(tra);
    // 0x76534D3ED03b40D2B4BC9062Bc69db60672Ef836
    // 블록이나 tr 불러오는거 한번 봐보면,
    // 일단 해시값을 알거나, 아니면 블록에 대한 정보로 불어와야 할 것 같은데,

    // 컨트랙트 불러온 계정으로 나머지 정보들 불러오기
    // 그런데 지금 메타마스크 계정 바꿔논 걸 어떻게 불러오지
    // db 불러오기
    const music = await Music.findOne({ title: req.body.name });
    // const music = await Music.findAll();

    // console.log(contract);
    // console.log(abc.eth.accounts);

    // 새로 만들어야할 컴포넌트
    // 회원 정보 수정 컴포넌트 만들어야함
    // 나의 NFT 컴포넌트 만들기

    // Recently Palyed 등등

    // 여러 곡에 대한 나의 정보도 db가 하나 더 있어야하겠네
    // const mymusic = await MyMusic.findAll();

    // res.json(data);

    // res.json(result);
    res.send("okok");
  });

  // 좋아요 수 처리
  server.post("/api/upLike", async (req, res) => {
    // const result = await Music.findAll();
    // const data = await Music.findOne({ title: req.body.name });
    // res.json(data);
    const title = Object.keys(req.body);
    const read = await Music.findOne({ where: { title: title } });
    await Music.update(
      { LikeMusic: read.LikeMusic + 1 },
      { where: { title: title } }
    );

    res.send("업하트 오케");
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
  server.post("/api/signup", async (req, res) => {
    try {
      const data = await User.create(req.body);
      res.send("회원가입 완료");
    } catch (err) {
      console.log(err);
    }
  });

  // 구매 첫 페이지
  server.get("/api/getBuy", async (req, res) => {
    const abc = await getBuy();

    res.json(abc);
  });

  server.get("/api/getNFT", async (req, res) => {
    // const NFTInstance = await getAuctionContract();
    const abc = await getImage();
    // console.log(abc);
    // console.log(ab);
    // res.send("no");
    res.json(abc);
  });

  server.get("/api/getAuction", async (req, res) => {
    // const NFTInstance = await getAuctionContract();
    const abc = await getAll();
    res.json(abc);
  });

  server.get("/api/getContract", async (req, res) => {
    const NFTInstance = await getAuctionContract();

    console.log(NFTInstance);
    res.send("1");
    // res.json(NFTInstance);
  });

  // server.get("/api/getBuyDataContract", async (req, res) => {
  //   const NFTInstance = await getBuyDataContract();

  //   res.json(NFTInstance);
  // });

  server.get("/api/getDate", (req, res) => {
    const aba = new Date();
    res.json(aba);
  });
  // 여기 보면 된다
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

async function getAuctionContract() {
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

async function getImage() {
  const Instance = await getAuctionContract();

  if (Instance) {
    // 클라이언트 변수 처리 부분
    // const [accountAddress, setAccountAddress] = useState("");
    // const [accountBalance, setAccountBalance] = useState("");
    // const [Contract, setContract] = useState(null);
    // const [ImageCount, setImageCount] = useState(0);
    // const [Images, setImages] = useState([]);
    // const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
    // const [Auctions, setAuctions] = useState([]);
    // // 얜 뭐 경매 시각 쓰려고 한건가
    // const [lastMintTime, setLastMintTime] = useState(null);
    // const [currentTime, setCurrentTime] = useState(null);

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
    return auctionsArray;
  }
}

async function getAll() {
  const Instance = await getAuctionContract();

  if (Instance) {
    // 클라이언트 변수 처리 부분
    // const [accountAddress, setAccountAddress] = useState("");
    // const [accountBalance, setAccountBalance] = useState("");
    // const [Contract, setContract] = useState(null);

    // const [ImageCount, setImageCount] = useState(0);
    // const [Images, setImages] = useState([]);
    // const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
    // const [Auctions, setAuctions] = useState([]);
    // // 얜 뭐 경매 시각 쓰려고 한건가
    // const [lastMintTime, setLastMintTime] = useState(null);
    // const [currentTime, setCurrentTime] = useState(null);

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

async function get옥션Buy() {
  const Instance = await getAuctionContract();

  if (Instance) {
    // 클라이언트 변수 처리 부분
    // const [accountAddress, setAccountAddress] = useState("");
    // const [accountBalance, setAccountBalance] = useState("");
    // const [Contract, setContract] = useState(null);
    // const [ImageCount, setImageCount] = useState(0);
    // const [Images, setImages] = useState([]);
    // const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
    // const [Auctions, setAuctions] = useState([]);
    // // 얜 뭐 경매 시각 쓰려고 한건가
    // const [lastMintTime, setLastMintTime] = useState(null);
    // const [currentTime, setCurrentTime] = useState(null);

    let offersArray = [];

    const ContractOfferCount = await Instance.methods.offerCount().call();

    for (let i = 1; i <= ContractOfferCount; i++) {
      // i인지 i+1인지 확인필요
      let offer = await Instance.methods.imageStorage(i + 1).call();
      offersArray = [...offersArray, offer];
    }

    return offersArray;
  }
}

async function getBuy() {
  const Instance = await getBuyDataContract();

  if (Instance) {
    // 클라이언트 변수 처리 부분
    // const [accountAddress, setAccountAddress] = useState("");
    // const [accountBalance, setAccountBalance] = useState("");
    // const [Contract, setContract] = useState(null);
    // const [ImageCount, setImageCount] = useState(0);
    // const [Images, setImages] = useState([]);
    // const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
    // const [Auctions, setAuctions] = useState([]);
    // // 얜 뭐 경매 시각 쓰려고 한건가
    // const [lastMintTime, setLastMintTime] = useState(null);
    // const [currentTime, setCurrentTime] = useState(null);

    const totalSupply = await Instance.methods.totalSupply().call();
    // 로드가 이게 끝인데, 왜 굳이 업데이트를 상태관리로 해놓은지 아직 이해가 안감
    // 얼마나 더 나은 결과물이길래

    let collection = [];
    for (let i = 0; i < totalSupply; i++) {
      const hash = await Instance.methods.tokenURIs(i).call();

      try {
        // 오류 핸들러니까 잠시 주석 처리
        const response = await fetch(
          `https://ipfs.infura.io/ipfs/${hash}?clear`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        console.log(response);
        // const metadata = await response.json();
        const owner = await Instance.methods.ownerOf(i + 1).call();

        collection = [
          {
            id: i + 1,
            // title: metadata.properties.name.description,
            // img: metadata.properties.image.description,
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

async function getOffer() {
  const Instance = await getBuyMethodContract();

  if (Instance) {
    // 클라이언트 변수 처리 부분
    // const [accountAddress, setAccountAddress] = useState("");
    // const [accountBalance, setAccountBalance] = useState("");
    // const [Contract, setContract] = useState(null);
    // const [ImageCount, setImageCount] = useState(0);
    // const [Images, setImages] = useState([]);
    // const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
    // const [Auctions, setAuctions] = useState([]);
    // // 얜 뭐 경매 시각 쓰려고 한건가
    // const [lastMintTime, setLastMintTime] = useState(null);
    // const [currentTime, setCurrentTime] = useState(null);

    const offerCount = await Instance.methods.offerCount().call();

    let offers = [];
    for (let i = 0; i < offerCount; i++) {
      const offer = await Instance.methods.offers(i + 1).call();
      offers.push(offer);

      offers = offers
        .map((offer) => {
          offer.offerId = parseInt(offer.offerId);
          offer.id = parseInt(offer.id);
          offer.price = parseInt(offer.price);
          return offer;
        })
        .filter(
          (offer) => offer.fulfilled === false && offer.cancelled === false
        );

      return offers;
    }
  }
}

// React
import { useState, useEffect } from "react";

// React-hook-Form
import { useForm } from "react-hook-form";

// MUI - Component
import { Box, Button, Container, TextField, Grid } from "@mui/material";

// MUI - Style
import { createTheme, ThemeProvider } from "@mui/material/styles";

// styled-componenets
import styled from "styled-components";

// web3
import web3 from "../connection/web3";
import contractJSON from "../../../build/contracts/NFTCollection.json";
import ImageNFTMarketplace from "../../../build/contracts/ImageMarketplace.json";

// React-query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// socket.io
import io from "socket.io-client";

const Boldtext = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  padding: 10px 20px 0px 20px;
`;

const Cardcontainer = styled.div`
  background-color: white;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: 14px;
  box-shadow: 0px 10px 30px hsl(185, 75%, 35%);
`;

const Img = styled.img`
  margin: auto;
  width: 40%;
  border: solid white 4px;
  border-radius: 5%;
  margin-top: 75px;
`;

const theme = createTheme();

// web3 setup도 따로 빼놓는 것도 일단은 굉장히 좋은 것 같음.
// 저거 import로 위에 한번 해놓으면 다른 컴포넌트에서도 적용 되나?
// 그럼 import가 맞음
// 컨트랙트 부분 일부러 밖으로 뺐음 좀 더 직관적으로 보기 편하게
// try, catch로 오류 잡기 좋음

// 컨트랙트 불러오기
const setupBlockchain = async () => {
  try {
    // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);

    // Get the contract instance.
    let balance =
      accounts.length > 0
        ? await web3.eth.getBalance(accounts[0])
        : await web3.utils.toWei("0");
    balance = await web3.utils.fromWei(balance, "ether");
    console.log("balance", balance);

    const networkId = await web3.eth.net.getId();
    console.log("networkId", networkId);

    const deployedAddress = ImageNFTMarketplace.networks[networkId].address;
    const NFTMarketplaceInstance = new web3.eth.Contract(
      ImageNFTMarketplace.abi,
      deployedAddress
    );
    console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);

    return NFTMarketplaceInstance;
  } catch (error) {
    // 위의 작업에 대한 오류를 포착합니다.
    alert(
      "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
    );
    console.error(error);
  }
};

const Minting = () => {
  const [현재메타마스크아이디, 현재메타마스크아이디변경] = useState();
  // get now accounts
  useEffect(() => {
    async function getNowAccount() {
      const accounts = await web3.eth.getAccounts();
      현재메타마스크아이디변경(accounts[0]);
    }
    getNowAccount();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // 소켓 처리
    // const socketClient = io("http://localhost:3000");

    // socketClient.on("connect", () => {
    //   console.log("쎾쓰");
    //   console.log("connection server");
    // });
    // socketClient.emit("successAuction");

    // CID 처리
    const ipfsClient = require("ipfs-http-client");
    const ipfs = ipfsClient.create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });

    // 이미지로 연습해봄
    // const bu = await ipfs.add(이미지버퍼);

    // 음원 버퍼
    const bu = await ipfs.add(data.musics[0]);

    // S3 처리부분
    const image = data.image[0];
    const imageFormData = new FormData();
    imageFormData.append("image", image);
    imageFormData.append("title", data.title);
    imageFormData.append("CID", bu.path);

    const resultImage = await axios.post(
      "http://localhost:8080/api/mint/image",
      imageFormData
    );
    console.log(resultImage);

    // ipfs 처리부분
    const musics = data.musics[0];
    const musicsFormData = new FormData();
    musicsFormData.append("musics", musics);
    // const resultMusics = await axios.post(
    //   "http://localhost:8080/api/mint/musics",
    //   musicsFormData
    // );
    // console.log(resultMusics);

    // 나머지 db처리부분
    let gg = {};
    gg.composer = data.albumGakkok;
    gg.lyricist = data.albumGaksa;
    gg.albumName = data.albumName;
    gg.release = data.albumYear;
    gg.artist = data.artist;
    gg.genre = data.genre;
    gg.title = data.title;

    const qq = await web3.eth.getAccounts();
    gg.address = qq[0];
    // const resultGG = await axios.post("http://localhost:8080/api/mint/gg", gg);

    // 컨트랙트 처리부분
    // imageNFT로 변경 처리
    const Contract = await setupBlockchain();
    const accounts = await web3.eth.getAccounts();
    // // 일단 cid 들어가는데 cid를 만드는 방법을 자세히 알고 쓰자 지금 업로드가 제대로 안되잖아
    await Contract.methods
      .mintImageNFT(data.title, bu.path)
      .send({ from: accounts[0] });
    console.log("=== Mint ===", data.title);
    // window.location.reload(true);

    // buy contract
    let pra;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();
    const deployedAddress1 = contractJSON.networks[networkId1].address;
    const contract1 = new web3.eth.Contract(contractJSON.abi, deployedAddress1);

    pra = contract1;
    praaccounts = accounts1;

    const metadata = {
      title: "Asset Metadata",
      type: "object",
      properties: {
        name: {
          type: "string",
          // description: enteredName,
        },
        description: {
          type: "string",
          // description: enteredDescription,
        },
        image: {
          type: "string",
          description: bu.path,
        },
      },
    };
    const metadataAdded = await ipfs.add(JSON.stringify(metadata));

    pra.methods
      .safeMint(metadataAdded.path)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log(hash);
      })
      .on("error", (e) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });

    // 한번에
    const form = new FormData();
    form.append("image", image);
    form.append("musics", musics);
    form.append("db", JSON.stringify(gg));
    form.append("address", JSON.stringify(현재메타마스크아이디));
    // form.append("CID", bu.path);
    const allMinting = await axios.post("http://localhost:8080/api/mint", form);

    // 옥션 로컬 db 저장
    const mintby = accounts[0];
    const rere2 = await axios.post("http://localhost:8080/api/auction", {
      mintby: mintby,
      CID: bu.path,
    });
  };

  // 이미지 변경에 대한 처리
  const [이미지, 이미지변경] = useState();
  const [이미지버퍼, 이미지버퍼변경] = useState();
  const changeImage = async (e) => {
    const file = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      이미지변경(reader.result);
      이미지버퍼변경(Buffer(reader.result));
    };
    reader.readAsDataURL(file[0]);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container sx={{ py: 15 }} maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Cardcontainer>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Boldtext>
                      <Img src={"/img/music2.jpeg"} />
                    </Boldtext>
                    <Boldtext>음원등록</Boldtext>
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      src={이미지}
                      style={{ margin: "20px" }}
                      loading="lazy"
                      height="500"
                      width="500"
                    />
                    <input
                      {...register("image", {
                        required: true,
                      })}
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        changeImage(e);
                      }}
                    ></input>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="제목"
                          autoFocus
                          {...register("title", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="가수명"
                          autoFocus
                          {...register("artist", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="앨범명"
                          autoFocus
                          {...register("albumName", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="발매년도"
                          autoFocus
                          {...register("albumYear", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="장르"
                          autoFocus
                          {...register("genre", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="작곡가"
                          autoFocus
                          {...register("albumGakkok", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="작사가"
                          autoFocus
                          {...register("albumGaksa", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        음원(파일)
                        <input
                          {...register("musics", {
                            required: true,
                          })}
                          accept="audio/*"
                          type="file"
                        ></input>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  음원 등록
                </Button>
              </Cardcontainer>
            </Box>
          </Container>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default Minting;

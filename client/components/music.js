import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";

import web3 from "./connection/web3";
import contractJSON from "../../build/contracts/NFTCollection.json";
import ImageNFTMarketplace from "../../build/contracts/ImageMarketplace.json";

import axios from "axios";

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

const Music = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // S3 처리부분
    const image = data.image[0];
    const imageFormData = new FormData();
    imageFormData.append("image", image);
    imageFormData.append("title", data.title);

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

    // const resultGG = await axios.post("http://localhost:8080/api/mint/gg", gg);

    // 컨트랙트 처리부분

    const ipfsClient = require("ipfs-http-client");
    const ipfs = ipfsClient.create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });

    const bu = await ipfs.add(이미지버퍼);
    console.log(bu);
    // imageNFT로 변경 처리
    const Contract = await setupBlockchain();
    const accounts = await web3.eth.getAccounts();
    // 일단 cid 들어가는데 cid를 만드는 방법을 자세히 알고 쓰자 지금 업로드가 제대로 안되잖아
    await Contract.methods
      .mintImageNFT(data.title, bu.path)
      .send({ from: accounts[0] });
    console.log("=== Mint ===", data.title);
    // window.location.reload(true);

    // 한번에
    const form = new FormData();
    form.append("image", image);
    form.append("musics", musics);
    form.append("db", JSON.stringify(gg));

    const rere = await axios.post("http://localhost:8080/api/mint", form);
  };
  // console.log(errors);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <main>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    음원 등록
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    앨범커버 이미지 등록 이미지 첨부하면 렌더링하는 것까지
                    구현하자
                    <img
                      src={이미지}
                      // alt={detailImageFile.name}
                      loading="lazy"
                      height="300"
                      width="300"
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
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        음원(파일)
                        <input
                          {...register("musics", {
                            required: true,
                          })}
                          type="file"
                        ></input>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </main>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              음원 등록
            </Button>
          </Container>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default Music;

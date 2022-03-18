import { useForm } from "react-hook-form";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";

import web3 from "./connection/web3";
import contractJSON from "../../build/contracts/NFTCollection.json";

import axios from "axios";

const theme = createTheme();

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
    const resultImage = await axios.post(
      "http://localhost:8080/api/mint/image",
      imageFormData
    );

    // ipfs 처리부분
    const musics = data.musics[0];
    const musicsFormData = new FormData();
    musicsFormData.append("musics", musics);
    const resultMusics = await axios.post(
      "http://localhost:8080/api/mint/musics",
      musicsFormData
    );

    // 컨트랙트 처리부분
    const reader = new window.FileReader();
    // reader.readAsArrayBuffer(data);
    const capturedFileBuffer = Buffer(JSON.stringify(data));

    let pra;
    let praaccounts;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contractJSON.networks[networkId].address;
    const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress);

    pra = contract;
    praaccounts = accounts;

    const ipfsClient = require("ipfs-http-client");
    const ipfs = ipfsClient.create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });

    const fileAdded = await ipfs.add(capturedFileBuffer);
    if (!fileAdded) {
      console.error("Something went wrong when updloading the file");
      return;
    }

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
          description: fileAdded.path,
        },
      },
    };

    const metadataAdded = await ipfs.add(JSON.stringify(metadata));
    if (!metadataAdded) {
      console.error("Something went wrong when updloading the file");
      return;
    }

    pra.methods
      .safeMint(metadataAdded.path)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log(hash);
        // pra.setNftIsLoading(true);
      })
      .on("error", (e) => {
        window.alert("Something went wrong when pushing to the blockchain");
        // pra.setNftIsLoading(false);
      });

    // 나머지 db처리부분
    let gg = {};
    gg.composer = data.albumGakkok;
    gg.lyricist = data.albumGaksa;
    gg.albumName = data.albumName;
    gg.release = data.albumYear;
    gg.artist = data.artist;
    gg.genre = data.genre;
    gg.title = data.title;

    console.log(gg);
    const resultGG = await axios.post("http://localhost:8080/api/mint/gg", gg);
  };
  // console.log(errors);

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
                    <input
                      {...register("image", {
                        required: true,
                      })}
                      type="file"
                    ></input>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          autoComplete="given-name"
                          name="Title"
                          required
                          fullWidth
                          id="Title"
                          label="Title"
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
                          autoComplete="given-name"
                          variant="standard"
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
                          autoComplete="given-name"
                          variant="standard"
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
                          autoComplete="given-name"
                          variant="standard"
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
                          autoComplete="given-name"
                          variant="standard"
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
                          autoComplete="given-name"
                          variant="standard"
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
                          autoComplete="given-name"
                          variant="standard"
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

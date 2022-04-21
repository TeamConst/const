import React, { useState, useMemo } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import countryList from "react-select-country-list";

import web3 from "../connection/web3";

const theme = createTheme();

const SignupForm = () => {
  // const [이미지, 이미지변경] = useState();
  // const [title,setTitle] =useState();
  
  // const changeImage = async (e) => {
  //   const file = e.target.files;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     이미지변경(reader.result);

  //   };
  //   reader.readAsDataURL(file[0]);
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {

 
      // const image = data.image[0];
      // console.log(image)
      // const imageFormData = new FormData();
      // imageFormData.append("image", image);
      // imageFormData.append("title", image.name);
      // imageFormData.append("CID", image.name);
      // setTitle(image.title)
      // const resultImage = await axios.post(
      //   "http://localhost:8080/api/mint/image",
      //   imageFormData
      // );
      // console.log(resultImage);
      //  console.log(data)
       const address = await web3.eth.getAccounts();
      data.address = address[0];
    let gg = {};
    gg.address = data.address;
    gg.id2 = data.id2;
    gg.artist = data.artist;
    gg.password = data.password;
    gg.name = data.name;
    gg.favor_genre = data.favor_genre;
    gg.nation = data.nation;
    // gg.profileImg =`https://const123.s3.ap-northeast-2.amazonaws.com/image/${image.name}.jpg`
      // 실제에서는 여기서 어드레스 받고 폼 데이터랑 같이 보내준다고 처리하자
      // 우리는 truffle accounts로 계정은 이미 만든 상태다 가정하고 처리
      // console.log(web3);
      // const abc = web3.eth.accounts.create();
      // console.log(abc);

      

      console.log(gg);
      const result = await axios.post("http://localhost:8080/api/signup", gg);
      console.log(result);
    } catch (err) {
      console.log("회원가입 오류에연", err);
    }
  };

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value) => {
    setValue(value);
  };

  return (
   
    <form onSubmit={handleSubmit(onSubmit)}> 
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  <div>
                    <label>아티스트</label>
                    <input
                      {...register("artist")}
                      type="radio"
                      value="Artist"
                    />
                    <label>일반 유저 </label>
                    <input
                      {...register("artist")}
                      type="radio"
                      value="Normal"
                    />
                  </div>
                </Typography>
                <h3>아티스트는 경매 권한을 부여 받습니다</h3>
              </Grid>
              <br></br>

              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  ID
                </Typography>
                <TextField
                  autoComplete="given-id"
                  name="ArtistId"
                  required
                  fullWidth
                  id="artistId"
                  label="Artist Id"
                  autoFocus
                  {...register("id2", {
                    required: true,
                    maxLength: 80,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Password
                </Typography>
                <TextField
                  autoComplete="given-password"
                  name="ArtistPassword"
                  required
                  fullWidth
                  type="password"
                  id="artistPassword"
                  label="Artist Password"
                  autoFocus
                  {...register("password", {
                    required: true,
                    maxLength: 80,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Re-Password
                </Typography>
                <TextField
                  autoComplete="given-repassword"
                  name="ArtistRepassword"
                  required
                  fullWidth
                  type="password"
                  id="artistRepassword"
                  label="Artist Repassword"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Name
                </Typography>
                <TextField
                  autoComplete="given-name"
                  name="ArtistName"
                  required
                  fullWidth
                  id="artistName"
                  label="Artist Name"
                  autoFocus
                  {...register("name", {
                    required: true,
                    maxLength: 80,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Nation
                </Typography>
                <Select
                  options={options}
                  value={value}
                  onChange={changeHandler}
                />
                <input
                  value={value.label}
                  {...register("nation", { required: true })}
                ></input>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Genre
                </Typography>
                <div>
                  <label>장르</label>
                  <select {...register("favor_genre", { required: true })}>
                    <option value="Pop">팝</option>
                    <option value="Balad">발라드</option>
                    <option value="그 외 임시">등등</option>
                  </select>
                </div>
              </Grid>
             {/* <Grid item xs={12}>
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
                </Grid> */}
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  MetaMask Address
                </Typography>
                <TextField
                  autoComplete="given-addressname"
                  name="ArtistAddress"
                  fullWidth
                  id="artistAddress"
                  label="Artist Address"
                  autoFocus
                  {...register("address", {
                    maxLength: 80,
                  })}
                />
                <Typography component="h5" variant="h5">
                  메타마스크 계정이 있을 경우 입력해 주세요. 미입력시 메타마스크
                  계정이 자동 생성되어 저장됩니다.
                </Typography>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default SignupForm;

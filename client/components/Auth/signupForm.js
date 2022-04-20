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
  const [최종, 최종변경] = useState(false);
  const [현재아이디, 현재아이디변경] = useState();
  const [아이디유효성, 아이디유효성변경] = useState();

  const validId = async () => {
    const a = await axios.post("http://localhost:8080/api/validId", {
      id2: 현재아이디,
    });

    if (a.data == "아이디가있습니다") {
      아이디유효성변경("아이디가 이미 있답니다");
      최종변경(false);
    } else {
      최종변경(true);
    }
  };

  console.log("최종", 최종);
  console.log(현재아이디);
  const changeId = async (e) => {
    const id = e.target.value;
    현재아이디변경(id);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 실제에서는 여기서 어드레스 받고 폼 데이터랑 같이 보내준다고 처리하자
      // 우리는 truffle accounts로 계정은 이미 만든 상태다 가정하고 처리
      // console.log(web3);
      // const abc = web3.eth.accounts.create();
      // console.log(abc);

      const address = await web3.eth.getAccounts();
      data.address = address[0];

      console.log(data);
      const result = await axios.post("http://localhost:8080/api/signup", data);
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
                      required
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
                  onChange={(e) => {
                    changeId(e);
                  }}
                  autoFocus
                  {...register("id2", {
                    required: true,
                    maxLength: 80,
                  })}
                />
                <input
                  onChange={(e) => {
                    changeId(e);
                  }}
                ></input>
                <Button
                  onClick={() => validId()}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  아이디 있나 보기
                </Button>

                {아이디유효성}
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

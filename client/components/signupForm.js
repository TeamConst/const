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

import web3 from "./connection/web3";

const theme = createTheme();

const SignupForm = () => {
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

      const result = await axios.post("http://localhost:8080/api/signup", data);
      console.log(result);
    } catch (err) {
      console.log("회원가입 오류에연");
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <h3>아티스트는 경매 권한을 부여 받습니다</h3>

            {/* radio */}
            <div>
              <label>아티스트</label>
              <input {...register("artist")} type="radio" value="Artist" />
              <label>일반 유저 </label>
              <input {...register("artist")} type="radio" value="Normal" />
            </div>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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

              {/* 셀렉트 일부러 만들어놈 */}
              <div>
                <label>Nation</label>
                <Select
                  options={options}
                  value={value}
                  onChange={changeHandler}
                />
              </div>
              <input
                value={value.label}
                {...register("nation", { required: true })}
              ></input>
              <Grid item xs={12}>
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
                <TextField
                  autoComplete="given-name"
                  name="ArtistName"
                  fullWidth
                  id="artistName"
                  label="Artist Name"
                  autoFocus
                  {...register("address", {
                    required: true,
                    maxLength: 80,
                  })}
                />
                <Typography component="h1" variant="h5">
                  메타마스크 계정이 있을 경우 입력해 주세요. 미입력시 메타마스크
                  계정이 자동 생성되어 저장됩니다.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Const 화이팅~"
                />
              </Grid>
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
                <Link href="#" variant="body2">
                  클릭하면 메타마스크 연결하고 인덱스로 돌아가게 하겠음 Already
                  have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default SignupForm;

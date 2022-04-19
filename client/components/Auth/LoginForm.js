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

const LoginForm = () => {
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

      const result = await axios.post("http://localhost:8080/api/login", data);
      console.log(result);

      window.location.href = "http://localhost:8080/";
    } catch (err) {
      console.log("회원가입 오류에연");
    }
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
              Login
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                <TextField
                  autoComplete="given-password"
                  name="ArtistPassword"
                  required
                  type="password"
                  fullWidth
                  id="artistPassword"
                  label="Artist Password"
                  autoFocus
                  {...register("password", {
                    required: true,
                    maxLength: 80,
                  })}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default LoginForm;

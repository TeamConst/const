import React, { useState, useMemo } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import countryList from "react-select-country-list";

const theme = createTheme();

const userUpdate = () => {
  const useUser1 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const data1 = useUser1();

  let a = 0;
  let userSession;
  if (data1.data) {
    a = 1;
    userSession = data1.data.data;
  }
  console.log(userSession);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      //  const address = await web3.eth.getAccounts();
      // data.address = address[0]
      const result = await axios.post("http://localhost:8080/api/updateuser3", {
        name: data.name,
        favor_genre: data.favor_genre,
        nation: data.nation,
        id: userSession.id,
      });
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
              유저 정보 변경
            </Typography>

            <Grid container spacing={5}>
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
              </Grid> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                수정
              </Button>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default userUpdate;

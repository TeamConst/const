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

import styled from "styled-components";

const Img = styled.img`
    text-align: center;
    width: 80%;
    border-radius: 5%;
`;
const Boldtext = styled.div`
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
const theme = createTheme();

const UpdateForm = () => {
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

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            //  const address = await web3.eth.getAccounts();
            // data.address = address[0]
            const result = await axios.post(
                "http://localhost:8080/api/updateUserInfo",
                {
                    name: data.name,
                    favor_genre: data.favor_genre,
                    nation: data.nation,
                    id: userSession.id,
                }
            );

            if (result.data !== "회원정보 수정 완료") {
                alert("회원정보 수정을 실패하였습니다.");
                window.location.href = "http://localhost:8080/mypage";
            }

            alert("회원정보 수정을 성공하였습니다.");
            window.location.href = "http://localhost:8080/mypage";
        } catch (err) {
            alert(err);
            window.location.reload(true);
        }
    };

    const [value, setValue] = useState("");
    const options = useMemo(() => countryList().getData(), []);
    const changeHandler = (value) => {
        setValue(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ py: 22 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Cardcontainer>
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
                                <Boldtext>
                                    <Img src="/img/music3.jpeg" />
                                </Boldtext>
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
                                            {...register("nation", {
                                                required: true,
                                            })}
                                        ></input>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography component="h1" variant="h5">
                                            Genre
                                        </Typography>
                                        <div>
                                            <label>장르</label>
                                            <select
                                                {...register("favor_genre", {
                                                    required: true,
                                                })}
                                            >
                                                <option value="Pop">팝</option>
                                                <option value="Balad">
                                                    발라드
                                                </option>
                                                <option value="그 외 임시">
                                                    등등
                                                </option>
                                            </select>
                                        </div>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        회원 정보 수정
                                    </Button>
                                </Grid>
                            </Box>
                        </Container>
                    </Cardcontainer>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default UpdateForm;

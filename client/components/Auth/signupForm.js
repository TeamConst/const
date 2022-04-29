// React
import { useState, useEffect, useMemo } from "react";

// React-hook-form
import { useForm } from "react-hook-form";

// axios
import axios from "axios";

// MUI - Component
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    MenuItem,
    Select,
    Radio,
    IconButton,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    CircularProgress,
} from "@mui/material";

// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

// MUI - Custom Styles
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// web3
import web3 from "../connection/web3";

// country-list
import countryList from "react-select-country-list";

const Input = styled("input")({
    display: "none",
});

const Genres = [
    {
        value: "POP",
    },
    {
        value: "BALLAD",
    },
    {
        value: "EDM",
    },
    {
        value: "EXTRA",
    },
];

const theme = createTheme();

const SignupForm = () => {
    // 컴포넌트 이미지
    // const [컴포넌트이미지, 컴포넌트이미지변경]=useState('')

    // get now accounts
    const [초기메타마스크아이디, 초기메타마스크아이디변경] = useState();
    const [어드레스유효성, 어드레스유효성변경] = useState();
    const [어드레스유효성검사, 어드레스유효성검사변경] = useState(false);

    useEffect(() => {
        async function getNowAccount() {
            const accounts = await web3.eth.getAccounts();
            초기메타마스크아이디변경(accounts[0]);
        }
        getNowAccount();
    }, []);

    // 아이디 처리
    const [아이디, 아이디변경] = useState();
    const [아이디유효성, 아이디유효성변경] = useState();
    const [아이디유효성검사, 아이디유효성검사변경] = useState(false);

    const changeId = (event) => {
        const id = event.target.value;
        아이디변경(id);
        아이디유효성검사변경(false);
    };

    const validAddress = async () => {
        const a = await axios.post("http://localhost:8080/api/validAddress", {
            address: 초기메타마스크아이디,
        });
        if (a.data == "어드레스가 있습니다") {
            어드레스유효성변경(
                "중복된 어드레스가 존재합니다. 메타마스크 어드레스 변경 후 새로고침을 눌러주세요."
            );
        } else {
            어드레스유효성변경("중복된 어드레스가 없습니다");
            어드레스유효성검사변경(true);
        }
    };

    const validId = async () => {
        const a = await axios.post("http://localhost:8080/api/validId", {
            id2: 아이디,
        });
        if (a.data == "아이디가있습니다") {
            아이디유효성변경(
                "중복된 아이디가 존재합니다. 아이디를 변경해주세요."
            );
            아이디유효성검사변경(false);
        } else {
            아이디유효성변경("중복된 아이디가 없습니다");
            아이디유효성검사변경(true);
        }
    };

    // 비밀번호 처리
    const [비밀번호, 비밀번호변경] = useState();
    const [비밀번호유효성, 비밀번호유효성변경] = useState();
    const [비밀번호유효성검사, 비밀번호유효성검사변경] = useState(false);

    const inputPassword = (e) => {
        비밀번호변경(e.target.value);
        비밀번호유효성검사변경(false);
    };

    const changePassword = (e) => {
        비밀번호유효성검사변경(false);

        if (비밀번호 == e.target.value) {
            비밀번호유효성변경("비밀번호가 동일합니다");
            비밀번호유효성검사변경(true);
        } else {
            비밀번호유효성변경("비밀번호가 동일하지 않습니다");
        }
    };

    // 국가 처리
    const options = useMemo(() => countryList().getData(), []);
    const [국가, 국가변경] = useState("Korea, Republic of");

    const handleNation = (event) => {
        국가변경(event.target.value);
    };

    // 장르 처리
    const [장르, 장르변경] = useState("POP");

    const handleGenre = (event) => {
        장르변경(event.target.value);
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

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const accounts = await web3.eth.getAccounts();

            if (초기메타마스크아이디 !== accounts[0]) {
                alert(
                    "페이지 내에서 메타마스크 아이디를 변경하였습니다. 메타마스크를 확인해주세요"
                );
                window.location.reload(true);
            } else {
                const d1 = {
                    address: 초기메타마스크아이디,
                    id2: 아이디,
                    password: 비밀번호,
                    artist: data.artist,
                    name: data.name,
                    favor_genre: 장르,
                    nation: 국가,
                    profileImg: `https://const123.s3.ap-northeast-2.amazonaws.com/profile/${아이디}.jpg`,
                };

                const result = await axios.post(
                    "http://localhost:8080/api/signup",
                    d1
                );

                console.log(result.data);
                if (result.data !== "회원가입 완료") {
                    alert("회원가입 실패입니다. 다시 시도해주세요");
                    window.location.reload(true);
                }

                // 프로필 이미지 처리부분
                const image = data.image[0];
                const imageFormData = new FormData();

                imageFormData.append("image", image);
                imageFormData.append("id2", 아이디);

                const resultImage = await axios.post(
                    "http://localhost:8080/api/signup/image",
                    imageFormData
                );

                if (resultImage.data !== "프로필 이미지 등록 완료") {
                    alert("회원가입 실패입니다. 다시 시도해주세요");
                    window.location.reload(true);
                }
            }

            alert("회원가입이 완료되었습니다.");
            window.location.href = "http://localhost:8080/";
        } catch (err) {
            alert(err);
            window.location.reload(true);
        }

        return (
            <div>
                <CircularProgress></CircularProgress>
            </div>
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={theme}>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid item xs={4}></Grid>

                        <Grid item xs={4} textAlign="center">
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography sx={{ mb: 10 }}>Sign up</Typography>

                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            <Typography>
                                                ※ 아티스트는 판매 및 경매 권한을
                                                부여 받습니다 ※
                                            </Typography>

                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    row={true}
                                                    textAlign="center"
                                                    display="flex"
                                                    alignItems="center"
                                                >
                                                    <FormControlLabel
                                                        value="ARTIST"
                                                        control={<Radio />}
                                                        label="ARTIST"
                                                        required
                                                        {...register("artist")}
                                                    />
                                                    <FormControlLabel
                                                        value="NORMAL"
                                                        control={<Radio />}
                                                        label="NORMAL"
                                                        {...register("artist")}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            <Typography>
                                                <img
                                                    src={이미지}
                                                    loading="lazy"
                                                    height="300"
                                                    width="300"
                                                />
                                                <label htmlFor="icon-button-file">
                                                    {/* <Input
                          {...register("image", {
                            required: true,
                          })}
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          onChange={(e) => {
                            changeImage(e);
                          }}
                        ></Input> */}
                                                    <input
                                                        {...register("image", {
                                                            required: true,
                                                        })}
                                                        accept="image/*"
                                                        id="icon-button-file"
                                                        type="file"
                                                        onChange={(e) => {
                                                            changeImage(e);
                                                        }}
                                                    ></input>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="upload picture"
                                                        component="span"
                                                    >
                                                        {/* <AddAPhotoIcon></AddAPhotoIcon> */}
                                                    </IconButton>
                                                </label>
                                            </Typography>
                                            <Typography>
                                                ※ 이미지는 추후에 수정
                                                가능합니다 ※
                                            </Typography>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>
                                            MetaMask Address
                                        </Typography>
                                        <Typography>
                                            메타마스크에 연결되어 있는 아이디를
                                            확인해주세요
                                        </Typography>
                                        <Typography>
                                            메타마스크 변경시 F5를 눌러주세요
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="artistAddress"
                                            value={초기메타마스크아이디}
                                            autoFocus
                                        />
                                        <Button
                                            onClick={() => validAddress()}
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            어드레스 중복 확인
                                        </Button>
                                        <Typography>
                                            {어드레스유효성}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>ID</Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            label="ID"
                                            onChange={changeId}
                                            autoFocus
                                        />

                                        <Button
                                            onClick={() => validId()}
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            아이디 중복 확인
                                        </Button>
                                        <Typography>{아이디유효성}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Password</Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            label="Artist Password"
                                            autoFocus
                                            onChange={inputPassword}
                                        ></TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Re-Password</Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            onChange={changePassword}
                                            type="password"
                                            label="Artist Repassword"
                                            autoFocus
                                        />
                                        <Typography>
                                            {비밀번호유효성}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Name</Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Artist Name"
                                            autoFocus
                                            {...register("name", {
                                                required: true,
                                                maxLength: 80,
                                            })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Nation</Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Nation"
                                            options={options}
                                            value={국가}
                                            onChange={handleNation}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.label}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Genre</Typography>
                                        <TextField
                                            select
                                            label="Genre"
                                            fullWidth
                                            value={장르}
                                            onChange={handleGenre}
                                        >
                                            {Genres.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.value}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Typography>
                                            좋아하는 장르를 선택해주세요!
                                            <br></br>초기 추천 데이터에 반영이
                                            됩니다.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {아이디유효성검사 === true &&
                                        비밀번호유효성검사 === true &&
                                        어드레스유효성검사 === true ? (
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Sign Up
                                            </Button>
                                        ) : (
                                            <Typography>
                                                수정사항이 있습니다!
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item xs={4}></Grid>
                    </Grid>
                </ThemeProvider>
            </form>
        </div>
    );
};

export default SignupForm;

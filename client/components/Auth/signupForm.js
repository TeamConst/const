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
} from "@mui/material";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

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
  const [현재메타마스크아이디, 현재메타마스크아이디변경] = useState();

  useEffect(() => {
    async function getNowAccount() {
      const accounts = await web3.eth.getAccounts();
      현재메타마스크아이디변경(accounts[0]);
    }
    getNowAccount();
  }, []);

  // 아이디 처리
  const [아이디, 아이디변경] = useState();
  const [아이디유효성, 아이디유효성변경] = useState();
  const [아이디유효성검사, 아이디유효성검사변경] = useState(false);

  const changeId = (event) => {
    console.log(아이디);
    const id = event.target.value;
    아이디변경(id);
    아이디유효성검사변경(false);
  };

  const validId = async () => {
    const a = await axios.post("http://localhost:8080/api/validId", {
      id2: 아이디,
    });
    if (a.data == "아이디가있습니다") {
      아이디유효성변경("아이디가 이미 있답니다");
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
    console.log(비밀번호);
  };

  const changePassword = (e) => {
    비밀번호유효성검사변경(false);
    console.log(비밀번호);
    console.log(e.target.value);
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

    console.log("qkRNla");
    reader.readAsDataURL(file[0]);
  };

  useForm;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(국가);
  const onSubmit = async (data) => {
    const d1 = {
      address: 현재메타마스크아이디,
      id2: 아이디,
      password: 비밀번호,
      artist: data.artist,
      name: data.name,
      favor_genre: 장르,
      nation: 국가,
      profileImg: `https://const123.s3.ap-northeast-2.amazonaws.com/profile/${아이디}.jpg`,
    };

    const result = await axios.post("http://localhost:8080/api/signup", d1);

    // 프로필 이미지 처리부분
    const image = data.image[0];
    const imageFormData = new FormData();

    imageFormData.append("image", image);
    imageFormData.append("id2", 아이디);

    const resultImage = await axios.post(
      "http://localhost:8080/api/signup/image",
      imageFormData
    );

    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={4}>
           
            </Grid>

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
                        ※ 아티스트는 경매 권한을 부여 받습니다 ※
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
                            <AddAPhotoIcon></AddAPhotoIcon>
                          </IconButton>
                        </label>
                      </Typography>
                      <Typography>
                        ※ 이미지는 추후에 수정 가능합니다 ※
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>MetaMask Address</Typography>
                    <Typography>
                      메타마스크에 연결되어 있는 아이디를 확인해주세요
                    </Typography>
                    <Typography>메타마스크 변경시 F5를 눌러주세요</Typography>
                    <TextField
                      fullWidth
                      id="artistAddress"
                      value={현재메타마스크아이디}
                      autoFocus
                    />
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
                      아이디 있나 보기
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
                    <Typography>{비밀번호유효성}</Typography>
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
                        <MenuItem key={option.value} value={option.label}>
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
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    {아이디유효성검사 === true &&
                    비밀번호유효성검사 === true ? (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>
                    ) : (
                      <Typography>수정사항이 있습니다!</Typography>
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
         
            <Grid item xs={4}>
            
            </Grid>
            
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default SignupForm;

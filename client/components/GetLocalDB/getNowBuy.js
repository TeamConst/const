import {
    Button,
    Typography,
    Grid,
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useQuery } from "react-query";
import { fetchNowBuy } from "../../hooks";
import styled from "styled-components";
import Link from "next/link";
const IconsReact = styled.div`
    height: 20px;
    padding: 10px 20px 20px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const IconReact = styled.img`
    width: 20%;
    height: 30%;
`;
const IconReact2 = styled.img`
    width: 20px;
    height: 20px;
`;
const IconLeft = styled.div`
    display: flex;
    align-items: center;
    float: left;
`;
const ProfileImg = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 70%;
    float: left;
`;
const theme = createTheme();

const GetNowBuy = () => {
    const { data, isLoading, isFetching } = useQuery(["getNowBuy"], () =>
        fetchNowBuy()
    );

    let a = 0;
    let buyNowData = [];
    console.log(data);

    if (data) {
        if (data.data.length > 0) {
            a = 1;
            for (let i = 0; i < data.data.length; i++) {
                buyNowData[i] = data.data[i];
                buyNowData[
                    i
                ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
            }
        }
    }

    console.log(a);
    console.log(buyNowData);
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container sx={{ py: 2 }} maxWidth="xl">
                    <Typography variant="h4" component="h4" sx={{ m: 3 }}>
                        All Buy
                    </Typography>
                    <Grid container spacing={5} textAlign="center">
                        {a === 1 ? (
                            buyNowData.map((a) => (
                                <Link
                                    href={`/buy/${encodeURIComponent(a.CID)}`}
                                >
                                    <Grid item key={a.CID} xs={3}>
                                        <Card
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                borderRadius: "20px",
                                            }}
                                        >
                                            <IconLeft>
                                                <CardContent
                                                    sx={{ flexGrow: 0 }}
                                                >
                                                    <Typography>
                                                        {" "}
                                                        <ProfileImg
                                                            src={
                                                                a.BuyMusic_CID.Music_address.profileImg
                                                            }
                                                            alt="하트"
                                                        />{" "}
                                                        {a.BuyMusic_CID.Music_address.id2}
                                                    </Typography>
                                                </CardContent>
                                            </IconLeft>
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: "70%",
                                                    width: "100%",
                                                    objectFit: "fill",
                                                }}
                                                image={a.s3}
                                                alt="random"
                                            />
                                            <CardContent sx={{ flexGrow: 0 }}>
                                                <IconsReact>
                                                    <IconLeft>
                                                        <IconReact
                                                            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
                                                            alt="하트"
                                                        />
                                                        <div>
                                                            {
                                                                a.BuyMusic_CID
                                                                    .LikeMusic
                                                            }
                                                        </div>
                                                        <IconReact
                                                            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/comment.png"
                                                            alt="말풍선"
                                                        />
                                                        <div>
                                                            {
                                                                a.BuyMusic_CID
                                                                    .view
                                                            }
                                                        </div>
                                                    </IconLeft>
                                                    <IconReact2
                                                        src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/bookmark.png"
                                                        alt="북마크"
                                                    />
                                                </IconsReact>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Link>
                            ))
                        ) : (
                            <div>
                                <h1>아직 판매로 나온 상품이 없어용</h1>
                            </div>
                        )}
                    </Grid>

                    {
        buyNowData.length === 8
        ? <p><Link href={`/indexBuy`}>더보기</Link></p>
        : null
      }
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default GetNowBuy;

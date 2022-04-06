import Link from "next/link";

import { useEffect, useContext, useRef, createRef } from "react";
import { useQuery } from "react-query";
import { fetchBestCollections } from "../../hooks";

// import web3 from '../../../connection/web3';
// import Web3Context from '../../../store/web3-context';
// import CollectionContext from '../../../store/collection-context';
// import MarketplaceContext from '../../../store/marketplace-context';
// import { formatPrice } from '../../../helpers/utils';
// import eth from '../../../img/eth.png';

// import getWeb3 from "../../lib/getWeb3";
// import contractJSON from "../../../build/contracts/NFTMarketplace.json";
// import contractJSON from "../../../build/contracts/NFTCollection.json";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const BestCollection = () => {
  // 일단 useQuery 쓰기전에 데이터 패치만 먼저

  const { data, isLoading, isFetching } = useQuery(["bestCollections"], () =>
    fetchBestCollections()
  );
  console.log(data)

  // prefetch 이슈가 있어서 일단 양념쳐서 되게 해놨다
  let pictures;
  let a = 0;
  if (data) {
    pictures = data.data;
    a = 1;
  }
  // console.log(pictures.map[0]);
  console.log(isLoading);
  console.log(isFetching);
  // console.log(data.key)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {a === 1 ? (
              pictures.map((a) => (
                // 아 이렇게 쓰는 거구나 씨발
                <Link href={`/buysell/${encodeURIComponent(a.Key)}`}>
                  <Grid item key={a.Key} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={a.URL}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          뭐 딴 내용 들어갈거?
                        </Typography>
                        <Typography>{a.Key}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Link>
              ))
            ) : (
              <h1>아님</h1>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default BestCollection;

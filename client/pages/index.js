import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchLocals } from "../hooks";

import Container from "@mui/material/Container";

import GetVideo from "../components/GetLocalDB/getVideo";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";
import GetNowNFT from "../components/GetLocalDB/getNowNFT";
import GetMyFavoriteNFTDB from "../components/GetLocalDB/Mine/getMyFavoriteNFTDB";

const Page = () => {
  return (
    <div>
      <Header></Header>
      <Container>
        <GetVideo></GetVideo>
        <GetNowNFT></GetNowNFT>
        <GetNowBuy></GetNowBuy>
        <GetNowAuction></GetNowAuction>
      </Container>
      <Footer></Footer>
    </div>
  );
};

const MyData = () => {
  return <GetMyFavoriteNFTDB></GetMyFavoriteNFTDB>;
};
export default Page;

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchLocals } from "../hooks";

import AuctionCollection from "../components/Auction/AuctionCollection";
import GetVideo from "../components/GetLocalDB/getVideo";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";
import GetNowNFT from "../components/GetLocalDB/getNowNFT";
import ListenMusic from "../components/GetLocalDB/listenMusic";

const Page = () => {
  return (
    <div>
      <Header></Header>
      {/* <AuctionCollection /> */}

      <GetVideo></GetVideo>
      <GetNowNFT></GetNowNFT>
      <GetNowBuy></GetNowBuy>
      <GetNowAuction></GetNowAuction>

      <Footer></Footer>
    </div>
  );
};

export default Page;

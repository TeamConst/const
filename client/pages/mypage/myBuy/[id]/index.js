import { useRouter } from "next/router";

import Header from "../../../../components/Layout/header";
import Footer from "../../../../components/Layout/footer";
import GetMyBuy from "../../../../components/GetContract/Mine/getMyBuy";
import GetMyBuyDB from "../../../../components/GetLocalDB/Mine/getMyBuyDB";
import { useQuery, dehydrate, QueryClient } from "react-query";

// import { fetchLocals } from "../../hooks/locals";

const MyBuy = () => {
  return <GetMyBuyDB></GetMyBuyDB>;
};

// 여기서 SSG 하는 방법을 알아보아야 겠다

export default MyBuy;

import Layout from "../components/layout";
import GetOffer from "../components/getOffer";

import GetNFT from "../components/getNFT";
import GetBuy from "../components/getBuy";
import GetNowBuy from "../components/getNowBuy";

const Practice2 = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      {/* <GetOffer></GetOffer> */}
      <GetNFT></GetNFT>
      <GetBuy></GetBuy>
      <GetNowBuy></GetNowBuy>
    </div>
  );
};

export default Practice2;

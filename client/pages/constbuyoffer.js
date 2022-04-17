import Layout from "../components/layout";
import GetBuyOffer from "../components/getBuyOffer";

const ConstBuyOffer = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetBuyOffer></GetBuyOffer>
    </div>
  );
};

export default ConstBuyOffer;

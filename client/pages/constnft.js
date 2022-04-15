import Layout from "../components/layout";
import GetNFT from "../components/getNFT";

const ConstBuy = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetNFT></GetNFT>
    </div>
  );
};

export default ConstBuy;

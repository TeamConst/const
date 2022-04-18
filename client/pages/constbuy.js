import Layout from "../components/layout";
import GetBuy from "../components/getBuy";
import GetNowBuy from "../components/getNowBuy";

const ConstBuy = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetNowBuy></GetNowBuy>
      {/* <GetBuy></GetBuy> */}
    </div>
  );
};

export default ConstBuy;

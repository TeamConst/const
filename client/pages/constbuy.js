import Layout from "../components/layout";
import GetBuy from "../components/getBuy";

const ConstBuy = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetBuy></GetBuy>
    </div>
  );
};

export default ConstBuy;

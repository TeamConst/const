import Layout from "../components/Layout/layout";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";

const IndexBuy = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetNowBuy></GetNowBuy>
    </div>
  );
};

export default IndexBuy;

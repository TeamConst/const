import Layout from "../components/Layout/layout";
import GetNowNFT from "../components/GetLocalDB/getNowNFT";

const IndexNFT = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetNowNFT></GetNowNFT>
    </div>
  );
};

export default IndexNFT;

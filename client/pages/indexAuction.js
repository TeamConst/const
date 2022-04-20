import Layout from "../components/Layout/layout";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";

const IndexAuction = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <GetNowAuction></GetNowAuction>
    </div>
  );
};

export default IndexAuction;

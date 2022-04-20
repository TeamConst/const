import Layout from "../components/Layout/layout";
import SetAuction from "../components/setAuction";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";

const IndexAuction = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <SetAuction></SetAuction>
      <GetNowAuction></GetNowAuction>
    </div>
  );
};

export default IndexAuction;

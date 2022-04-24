import Header from "../components/Layout/Header";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";

const IndexAuction = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Header></Header>
      <GetNowAuction></GetNowAuction>
    </div>
  );
};

export default IndexAuction;

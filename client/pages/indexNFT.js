import Header from "../components/Layout/Header";
import GetNowNFT from "../components/GetLocalDB/getNowNFT";

const IndexNFT = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Header></Header>
      <GetNowNFT></GetNowNFT>
    </div>
  );
};

export default IndexNFT;

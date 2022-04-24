import Header from "../components/Layout/Header";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";

const IndexBuy = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Header></Header>
      <GetNowBuy></GetNowBuy>
    </div>
  );
};

export default IndexBuy;

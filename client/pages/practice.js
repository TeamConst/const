import Layout from "../components/layout";
import SetAuction from "../components/setAuction";
import GetBuy from "../components/getBuy";
const Practice = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Layout></Layout>
      <SetAuction></SetAuction>
      <GetBuy></GetBuy>
    </div>
  );
};

export default Practice;

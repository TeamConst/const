import Header from "../components/Layout/header";
import GetBuyOffer from "../components/getBuyOffer";

const ConstBuyOffer = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      <Header></Header>
      <GetBuyOffer></GetBuyOffer>
    </div>
  );
};

export default ConstBuyOffer;

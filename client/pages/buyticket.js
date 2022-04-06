import Layout from "../components/layout";
import Ticket from "../components/ticket";

const Buyticket = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <Ticket></Ticket>

      {/* <MintForm></MintForm> */}
    </div>
  );
};

export default Buyticket;

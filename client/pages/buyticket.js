import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchUserSession } from "../hooks";

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import Ticket from "../components/Ticket/ticket";

const Buyticket = () => {
  // const { data, isLoading, isFetching } = useQuery(["getUserSession"], () =>
  //   fetchUserSession()
  // );

  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <Ticket></Ticket>
      <Footer></Footer>
    </div>
  );
};



export default Buyticket;

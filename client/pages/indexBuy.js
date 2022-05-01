import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchNowBuy } from "../hooks";

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";
import AllBuy from "../components/GetLocalDB/List/Allbuy/AllBuy";

const IndexBuy = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowBuy"], () =>
    fetchNowBuy()
  );

  return (
    <div>
      <Header></Header>
      {/* <GetNowBuy></GetNowBuy> */}
      <AllBuy></AllBuy>
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getNowBuy"], () => fetchNowBuy());

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default IndexBuy;

import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchNowBuy } from "../hooks";

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";

const IndexBuy = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowBuy"], () =>
    fetchNowBuy()
  );

  return (
    <div>
      <Header></Header>
      <GetNowBuy></GetNowBuy>
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getNowBuy"], () => fetchNowBuy());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default IndexBuy;

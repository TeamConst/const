import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchNowAuction } from "../hooks";

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";

const IndexAuction = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowAuction"], () =>
    fetchNowAuction()
  );

  return (
    <div>
      <Header></Header>
      <GetNowAuction></GetNowAuction>
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getNowAuction"], () => fetchNowAuction());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default IndexAuction;

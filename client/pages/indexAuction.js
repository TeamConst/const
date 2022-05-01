import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchNowAuction } from "../hooks";

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";
import AllAuction from "../components/GetLocalDB/List/AllAucion/AllAuction";

const IndexAuction = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowAuction"], () =>
    fetchNowAuction()
  );

  return (
    <div>
      <Header></Header>
      <AllAuction></AllAuction>
      {/* <GetNowAuction></GetNowAuction> */}
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getNowAuction"], () => fetchNowAuction());

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default IndexAuction;

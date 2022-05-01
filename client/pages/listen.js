import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import ListenMusic from "../components/GetLocalDB/listenMusic";

import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchMusicTop100 } from "../hooks";

const Listen = () => {
  return (
    <div>
      <Header></Header>
      <ListenMusic></ListenMusic>
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(["getMusicTop100"], () => fetchMusicTop100());

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Listen;

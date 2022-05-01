import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchNowNFT } from "../hooks";

import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import GetNowNFT from "../components/GetLocalDB/getNowNFT";
import AllNft from "../components/GetLocalDB/List/AllNft/AllNft";

const IndexNFT = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowNFT"], () =>
    fetchNowNFT()
  );

  return (
    <div>
      <Header></Header>
      {/* <GetNowNFT></GetNowNFT> */}
      <AllNft></AllNft>
      <Footer></Footer>
    </div>
  );
};

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["getNowNFT"], () => fetchNowNFT());

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// }

export default IndexNFT;

import { useRouter } from "next/router";

import GetMyNFT from "../../../../components/GetContract/Mine/getMyNFT";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchMyNFTDB } from "../../../../hooks";

const MyNFT = () => {
    // const { data, isLoading, isFetching } = useQuery(["getMyNFTDB"], () =>
    //   fetchMyNFTDB()
    // );

    return <GetMyNFT></GetMyNFT>;
};

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["getMyNFTDB"], () => fetchMyNFTDB());

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Buy;

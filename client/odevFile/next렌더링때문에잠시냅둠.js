import Header from "../components/Layout/header";
import GetNFT from "../components/getNFT";

import axios from "axios";
import { useQuery, dehydrate, QueryClient, useQueryClient } from "react-query";

const NFT = (props) => {
  console.log(props);
  const { data } = useQuery(
    "repoData",
    axios.get("https://api.github.com/repos/tannerlinsley/react-query", {
      initialData: props.a,
    })
    // axios.get("http://localhost:8080/api/getDate", { initialData: props.post })
  );

  return (
    <div>
      <Header></Header>
      <GetNFT></GetNFT>
    </div>
  );
};

export async function getStaticProps() {
  // const queryClient = new QueryClient();
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries("repoData");

  // const post = await axios.get("http://localhost:8080/api/getDate");
  const post = await axios.get(
    "https://api.github.com/repos/tannerlinsley/react-query"
  );
  const a = "abc";

  return {
    // props: {
    //   dehydratedState: dehydrate(queryClient),
    // },
    props: { a },
  };
}
export default NFT;

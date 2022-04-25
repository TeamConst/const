import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchOffer } from "../hooks";

const Practice = () => {
  const { data, isLoading, isFetching } = useQuery(["getOffer"], () =>
    fetchOffer()
  );

  console.log(data);
  return <div>1</div>;
};

export default Practice;

import { useQuery } from "react-query";
import { fetchOffer } from "../hooks";

const GetOffer = () => {
  const { data, isLoading, isFetching } = useQuery(["getOffer"], () =>
    fetchOffer()
  );

  console.log(data);

  return <div>1</div>;
};

export default GetOffer;

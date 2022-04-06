import { useQuery } from "react-query";
import { fetchBuy } from "../hooks";

const Buy = () => {
  const { data, isLoading, isFetching } = useQuery(["buy"], () => fetchBuy());

  return <div>1</div>;
};

export default Buy;

import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchMyAuctionDB = async () => {
  const data = await axios.get("http://localhost:8080/api/getMyAuctionDB", {});

  return data;
};

export { fetchMyAuctionDB };
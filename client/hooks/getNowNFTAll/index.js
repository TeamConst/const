import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchNowNFTAll = async () => {
  const data = await axios.get("http://localhost:8080/api/getNowNFTAll", {});

  return data;
};

export { fetchNowNFTAll };

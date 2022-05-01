import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchNowNFT = async () => {
  const data = await axios.get("http://54.227.126.254:8080/api/getNowNFT", {});

  return data;
};

export { fetchNowNFT };

import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchNowBuyAll = async () => {
  const data = await axios.get("http://54.227.126.254:8080/api/getNowBuyAll", {});

  return data;
};

export { fetchNowBuyAll };

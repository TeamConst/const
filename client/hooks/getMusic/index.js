import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchMusic = async (param) => {
  const data = await axios.post("http//54.227.126.254:8080/api/getMusic", {
    name: param,
  });

  return data;
};

export { fetchMusic };

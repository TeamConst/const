import axios from "axios";

const fetchMyNFT = async (param) => {
  const data = await axios.post("http://localhost:8080/api/getMyNFT", {
    name: param,
  });

  return data;
};

export { fetchMyNFT };

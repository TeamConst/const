import axios from "axios";

const fetchMyNFT = async () => {
  const data = await axios.get("http://localhost:8080/api/getMyNFT");

  return data;
};

export { fetchMyNFT };

import axios from "axios";

const fetchAuction = async () => {
  const data = await axios.get("http//54.227.126.254:8080/api/getAuction");
  return data;
};

export { fetchAuction };

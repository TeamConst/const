import axios from "axios";

const fetchAuction = async () => {
  const data = await axios.get("http://localhost:8080/api/getAuction");
  return data;
};

export { fetchAuction };

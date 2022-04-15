import axios from "axios";

const fetchAuction = async () => {
  const data = await axios.get("http://13.209.65.10:8080/api/getAuction");
  return data;
};

export { fetchAuction };

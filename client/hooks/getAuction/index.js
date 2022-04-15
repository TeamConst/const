import axios from "axios";

const fetchContract = async () => {
  const data = await axios.get("http://13.209.65.10:8080/api/getContract");
  return data;
};

export { fetchContract };

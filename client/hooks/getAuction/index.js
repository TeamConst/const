import axios from "axios";

const fetchContract = async () => {
  const data = await axios.get("http://localhost:8080/api/getContract");
  return data;
};

export { fetchContract };

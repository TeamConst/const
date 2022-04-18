import axios from "axios";

const fetchUserSession = async () => {
  const data = await axios.get("http://localhost:8080/api/getUserSession");
  return data;
};

export { fetchUserSession };

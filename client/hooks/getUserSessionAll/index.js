import axios from "axios";

const fetchUserSessionAll = async () => {
    const data = await axios.get("http://localhost:8080/api/getUserSessionAll");
    return data;
};

export { fetchUserSessionAll };

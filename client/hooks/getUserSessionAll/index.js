import axios from "axios";

const fetchUserSessionAll = async () => {
    const data = await axios.get("http//54.227.126.254:8080/api/getUserSessionAll");
    return data;
};

export { fetchUserSessionAll };

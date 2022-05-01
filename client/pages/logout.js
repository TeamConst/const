import axios from "axios";
import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        async function log() {
            const logout = await axios.get("http//54.227.126.254:8080/api/logout");

            alert("로그아웃을 성공하였습니다.");
            window.location.href = "http//54.227.126.254:8080/";
        }
        log();
    }, []);
    return <div></div>;
};

export default Logout;

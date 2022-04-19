import axios from "axios";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    async function log() {
      const logout = await axios.get("http://localhost:8080/api/logout");
      console.log(logout);

      window.location.href = "http://localhost:8080/";
      // window.location.reload(true);
    }
    log();
  }, []);
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      안녕~
    </div>
  );
};

export default Logout;

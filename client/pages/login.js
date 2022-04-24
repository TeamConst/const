import Header from "../components/Layout/Header";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;

import Layout from "../components/Layout/layout";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;

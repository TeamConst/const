import Layout from "../components/layout";
import SignupForm from "../components/signupForm";

const Signup = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <SignupForm></SignupForm>
    </div>
  );
};

export default Signup;

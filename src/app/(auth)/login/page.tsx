import type { Metadata } from "next";
import LoginForm from "./_component/LoginForm";

export const metadata: Metadata = {
  title: "Login | My Github",
  description: "Welcome to My Github!",
  openGraph: {
    title: "Login | MyGithub",
    description: "Welcome to My Github!",
    url: "https://github.com/seriouselly",
    siteName: "GitHub",
  },
};

const LoginPage = () => {
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

import type { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login | CodingIn Bootcamp",
  description: "Welcome to CodingIn Bootcamp!",
  openGraph: {
    title: "Login | CodingIn Bootcamp",
    description: "Welcome to CodingIn Bootcamp!",
    url: "https://github.com/seriouselly",
    siteName: "GitHub",
  },
};

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

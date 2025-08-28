"use client";

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Perform login logic
    router.push("/dashboard");
  };

  return (
    <div>
      <h2>LOGIN FORM</h2>
      <button className="cursor-pointer" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;

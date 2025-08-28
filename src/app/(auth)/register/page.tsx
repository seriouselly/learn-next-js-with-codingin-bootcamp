import type { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}): Promise<Metadata> => {
  const params = await searchParams;
  const titleFromQuery = params?.title;
  const title = titleFromQuery ? `${titleFromQuery} - My Github` : "My Github";
  return {
    title,
    description: "Register Page",
    openGraph: {
      title,
      description: "Create a new account on our platform",
    },
  };
};

const RegisterPage = () => {
  return <div>RegisterPage</div>;
};

export default RegisterPage;

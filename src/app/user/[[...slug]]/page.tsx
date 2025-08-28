"use client";

import { useParams } from "next/navigation";

const UserIdPage = () => {
  const params = useParams<{ slug: string[] }>();
  const slug = params.slug;
  const id: string = slug?.[0];
  const username: string = slug?.[1];

  return (
    <div>
      ID: {id}, USERNAME: {username}
    </div>
  );
};

export default UserIdPage;

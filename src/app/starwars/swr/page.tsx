"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  StarwarData,
  StarwarsCharacters,
} from "@/interfaces/starwars.interface";
import { axiosFetcher } from "@/configs/swr.config";
import useSWR from "swr";

const StarWarsSWRClientPage = () => {
  const { data, error, isLoading } = useSWR<StarwarData>(
    "/characters",
    axiosFetcher,
  );

  if (isLoading) {
    return <div className="m-4">Loading...</div>;
  }
  if (error) {
    return <div className="m-4">Failed to load</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 m-4">
        Star Wars Characters - Axios Client
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((character: StarwarsCharacters) => (
          <Card key={character._id} className="m-4">
            <CardHeader>
              <CardTitle>{character.name}</CardTitle>
              <p>{character.description}</p>
            </CardHeader>
            <CardContent>
              <Image
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default StarWarsSWRClientPage;

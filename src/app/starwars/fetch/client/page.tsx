"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  StarwarData,
  StarwarsCharacters,
} from "@/interfaces/starwars.interface";
import { useState, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_STARWARS_API;

const getStarwars = async (): Promise<StarwarData> => {
  const res = await fetch(`${baseUrl}/characters`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

const StarWarsFetchClientPage: React.FC = () => {
  const [data, setData] = useState<StarwarData | null>(null);

  useEffect(() => {
    getStarwars().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return <div className="m-4">Loading...</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 m-4">
        Star Wars Characters - Fetch Client
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

export default StarWarsFetchClientPage;

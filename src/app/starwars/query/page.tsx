"use client";

import Image from "next/image";
import { StarwarsCharacters } from "@/interfaces/starwars.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { charactersQueryKey, fetchCharacters } from "@/configs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StarWarsQueryPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: charactersQueryKey({ page, limit }),
    queryFn: () => fetchCharacters({ page, limit }),
  });

  const totalPages = data?.info?.total ? Math.ceil(data.info.total / limit) : 1;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Failed to load characters</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 m-4">
        Star Wars Characters
      </h1>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4 m-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="limit" className="text-sm">
            Items per page:
          </Label>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Select limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            variant={"outline"}
            size={"sm"}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            variant={"outline"}
            size={"sm"}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center"></div>
      </div>

      {/* Characters List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.data?.map((character: StarwarsCharacters) => (
          <Card key={character._id} className="w-full">
            <CardHeader>
              <Image
                src={character.image}
                alt={character.name}
                width={200}
                height={300}
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{character.name}</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                {character.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Info */}
      {data?.info && (
        <div className="text-center text-sm text-gray-600 mb-4">
          Showing ({(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, data.info.total)}) of {data.info.total}{" "}
          characters. Page {page} of {totalPages}.
        </div>
      )}
    </>
  );
};

export default StarWarsQueryPage;

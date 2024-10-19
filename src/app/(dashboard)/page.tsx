"use client";

import { me } from "@/service/auth";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await me(),
  });
  console.log(error, data);

  if (isLoading || isError) return <h1>123</h1>;

  return <>{JSON.stringify(data)}</>;
}

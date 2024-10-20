
import { me } from "@/service/auth";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await me(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export { useProfile } 
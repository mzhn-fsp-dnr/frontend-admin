import { QueryClientConfig } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const clientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      throwOnError(error, query) {
        if (error instanceof AxiosError) return false;
        // TODO: Return true only for NextRedirect
        return true;
      },
    },
  },
} satisfies QueryClientConfig;

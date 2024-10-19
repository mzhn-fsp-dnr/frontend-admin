import { clientConfig } from "@/lib/react-query";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient(clientConfig));
export default getQueryClient;

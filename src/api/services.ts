import client from "@/lib/axios";

export interface Category {
  id: string;
  name: string;
  parent_id: string;
  children: Category[];
}

export async function all() {
  return (await client.get("/services/services/")).data as Category[];
}

export async function get_service_by_id(service_id: string) {
  return (await client.get(`/services/services/${service_id}`))
    .data as Category;
}

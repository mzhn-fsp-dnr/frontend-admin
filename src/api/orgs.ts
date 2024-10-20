import client from "@/lib/axios";
import { OrgCreateDTO } from "@/lib/forms/orgs";

export interface Organization {
  id: string;
  name: string;
  address: string;
}

export async function all(): Promise<Organization[]> {
  return (await client.get("/offices/offices/")).data.items;
}

export async function create(data: OrgCreateDTO) {
  return await client.post("/offices/offices/", data);
}

export async function remove(id: string) {
  return await client.delete(`/offices/offices/${id}`);
}

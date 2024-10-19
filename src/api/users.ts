import { users } from "./mock/users";

export interface User {
  id: number;
  avatar: string | null;
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  email: string;
  roles: string[];
}

export function all() {
  return users;
}

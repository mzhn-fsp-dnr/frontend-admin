import { AuthResult } from "@/api/auth";
import { cookieStorage } from "./cookie";

export const authStorage = cookieStorage<AuthResult>("auth");

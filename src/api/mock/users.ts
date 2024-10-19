import { User } from "../users";

export const users: User[] = [
  {
    id: -1,
    email: "ai@example.com",
    firstName: "AI",
    lastName: "Bot",
    middleName: "",
    roles: [],
    avatar: "https://github.com/openai.png",
  },
  {
    id: 1,
    email: "user@example.com",
    firstName: "Иван",
    lastName: "Петров",
    middleName: "",
    roles: [],
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: -1000,
    email: "admin@example.com",
    firstName: "Александр",
    lastName: "#1633",
    middleName: "",
    roles: ["admin"],
    avatar: "https://github.com/starpandabeg.png",
  },
];

"use client";

import RoleRequired from "@/components/util/role-required";
import { ROLES } from "@/constants/roles";
import OperatorMainPage from "./OperatorMainPage";

export default function Home() {
  return <>
    <RoleRequired roles={[ROLES.OPERATOR]}>
      <OperatorMainPage />
    </RoleRequired> 
  </>
}

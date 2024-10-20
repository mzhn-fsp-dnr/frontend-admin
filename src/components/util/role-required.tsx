'use client';

import { useProfile } from '@/hooks/use-profile';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  roles?: string[];
}

export default function RoleRequired({ roles, children }: Props) {
  const { isLoading, data: user } = useProfile();

  if (!isLoading && user && (!roles || roles.some(item => user.roles.includes(item)))) {
    return <>{children}</>;
  }

  return <></>;
}
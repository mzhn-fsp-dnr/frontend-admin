'use client';

import { useProfile } from '@/hooks/use-profile';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  roles?: string[];
}

export default function NoAuth({ children }: Props) {
  const { isLoading, data: user } = useProfile();

  console.log(isLoading, user)

  if (!isLoading && !user) {
    return <>{children}</>;
  }

  return <></>;
}
'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface Props {
  children: ReactNode;
}

export const Registry = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

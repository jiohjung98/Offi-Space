'use client';
import React, { ReactNode } from 'react';

const BgPurpleLay = ({ children }: { children: ReactNode }) => {
  return <div className="w-full px-4 bg-space-purple-light">{children}</div>;
};

export default BgPurpleLay;

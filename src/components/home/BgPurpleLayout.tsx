'use client';
import React, { ReactNode } from 'react';

const BgPurpleLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full px-4 bg-space-purple">{children}</div>;
};

export default BgPurpleLayout;

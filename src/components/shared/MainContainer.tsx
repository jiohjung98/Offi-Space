import React, { ReactNode } from 'react';

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className=" max-w-[393px]  mx-auto">{children}</div>;
};

export default MainContainer;

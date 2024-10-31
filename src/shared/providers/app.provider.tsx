"use client";

import { ReactNode } from "react";
import RecoilContextProvider from "./recoil-context.provider";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return <RecoilContextProvider>{children}</RecoilContextProvider>;
};
export default AppProviders;

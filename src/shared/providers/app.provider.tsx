"use client";

import { ReactNode } from "react";
import RecoilContextProvider from "./recoil-context.provider";
import NotificationProvider from "./notification-stack.provider";
import ProgressBarProvider from "./progress-bar.provider";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilContextProvider>
      <NotificationProvider>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </NotificationProvider>
    </RecoilContextProvider>
  );
};
export default AppProviders;

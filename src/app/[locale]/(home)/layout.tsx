// src/app/home/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/shared/store/atoms/authAtom";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const authState = useRecoilValue(authAtom);
  const router = useRouter();

  useEffect(() => {
    if (!authState?.isLoggedIn) {
      router.replace("/login");
    }
  }, [authState.isLoggedIn, router]);

  return <>{children}</>;
}

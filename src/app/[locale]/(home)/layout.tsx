// src/app/home/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/shared/store/atoms/authAtom";
import Navbar from "@/components/Navbar";

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

  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

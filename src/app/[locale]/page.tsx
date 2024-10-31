"use client";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const auth = useRecoilValue(authAtom);
  const router = useRouter();

  console.log(auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (auth?.isLoggedIn) {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    }
  }, [auth?.isLoggedIn, router]);

  return null;
}

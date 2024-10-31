"use client";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/shared/utils/tokenExpired";

export default function HomePage() {
  const auth = useRecoilValue(authAtom);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (auth?.isLoggedIn) {
        if (isTokenExpired(auth?.accessToken)) {
          localStorage.removeItem("authToken");
          router.replace("/login");
        } else {
          router.replace("/");
        }
      } else {
        router.replace("/login");
      }
    }
  }, [auth, router]);

  return null;
}

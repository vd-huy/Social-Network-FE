"use client";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/shared/utils/tokenExpired";

export default function RootPage() {
  const auth = useRecoilValue(authAtom);
  const router = useRouter();

  console.log(auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (auth?.isLoggedIn) {
        if (isTokenExpired(auth?.accessToken)) {
          localStorage.removeItem("authState");
          router.replace("/login");
        } else {
          router.replace("/dashboard");
        }
      } else {
        router.replace("/login");
      }
    }
  }, [auth, router]);

  return null;
}

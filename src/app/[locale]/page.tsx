"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/shared/utils/tokenExpired";

export default function RootPage({ children }: { children: ReactNode }) {
  const auth = useRecoilValue(authAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      if (isTokenExpired(auth?.accessToken)) {
        localStorage.removeItem("authState");
        router.replace("/login");
      } else {
        router.replace("/home");
      }
    } else {
      router.replace("/login");
    }
    setLoading(false);
  }, [auth, router]);

  return loading ? <div>Loading...</div> : <div>{children}</div>;
}

"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { ILoginResponse } from "@/shared/types/auth.type";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const router = useRouter();

  const [authState, setAuthState] = useRecoilState(authAtom);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post<ILoginResponse>(
        `${process.env.API_URL}/auth/signin`,
        {
          email,
          password,
        }
      );

      const { data } = response;

      setAuthState({
        isLoggedIn: true,
        accessToken: data.data.access_token,
      });

      if (rememberMe) {
        localStorage.setItem("authState", JSON.stringify(authState));
      } else {
        sessionStorage.setItem("authState", JSON.stringify(authState));
      }
    } catch (err) {
      setError("Email or password is not correct");
      console.error(err);
    }
  };

  useEffect(() => {
    if (authState?.isLoggedIn) router.replace("/");
  }, [authState?.isLoggedIn, router]);

  return (
    <div className="md:h-screen flex justify-center items-center auth-background ">
      <div className="container mx-auto flex items-center md:shadow-md xl:p-32 md:p-5 flex-col md:flex-row bg-white">
        <div className="md:w-[40%] xl:w-1/2 w-full text-white bg-red-400 flex items-center justify-center flex-col gap-3 min-h-[300px]">
          <h1 className="text-4xl">{t("title")}</h1>
          <p className="text-xl">{t("haveAccount")}</p>
          <Button
            variant="outline"
            className="border-white bg-transparent rounded-xl"
          >
            {t("signUp")}
          </Button>
        </div>
        <div className="flex items-center justify-center flex-1 w-full p-3">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-4">{t("login")}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="rememberCheckbox"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setRememberMe(target.checked);
                }}
              />
              <label
                htmlFor="rememberCheckbox"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("rememberMe")}
              </label>
            </div>
            <button
              type="submit"
              className="bg-red-400 text-white font-bold py-2 px-4 rounded w-full"
            >
              {t("login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

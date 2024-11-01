"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios, { HttpStatusCode } from "axios";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { IAuthResponse } from "@/shared/types/auth.type";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useSnackbar } from "notistack";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignInPage() {
  const t = useTranslations("SignUpPage");
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [authState, setAuthState] = useRecoilState(authAtom);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post<IAuthResponse>(
        `${process.env.API_URL}/auth/signup`,
        {
          name,
          gender: gender === "true",
          email,
          password,
        }
      );

      const { data } = response;

      if (data.statusCode === HttpStatusCode.Created) {
        const newAuthState = {
          isLoggedIn: true,
          accessToken: data.data.access_token,
          remember: false,
        };

        // Show initial success notification
        let secondsLeft = 3;
        const snackbarKey = enqueueSnackbar(
          t("successfully", { second: secondsLeft }),
          {
            variant: "success",
            autoHideDuration: 3000,
          }
        );

        // Update countdown every second
        const countdown = setInterval(() => {
          setLoading(true);
          secondsLeft -= 1;

          if (secondsLeft > 0) {
            // Close and re-enqueue with updated time
            closeSnackbar(snackbarKey);
            enqueueSnackbar(t("successfully", { second: secondsLeft }), {
              variant: "success",
              autoHideDuration: 1000 * secondsLeft,
            });
          } else {
            clearInterval(countdown); // Stop countdown

            setLoading(false);
            // Set new auth state and save to session storage
            sessionStorage.setItem("authState", JSON.stringify(newAuthState));
            setAuthState(newAuthState);
          }
        }, 1000);
      } else {
        enqueueSnackbar(data.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      setError("Fail to sign up account");
      console.error(err);
    }
  };

  useEffect(() => {
    if (authState?.isLoggedIn) router.replace("/");
  }, [authState.isLoggedIn, router]);

  return (
    <div className="md:h-screen flex justify-center items-center auth-background">
      <div className="container mx-auto flex items-center md:shadow-md xl:p-16 md:p-5 flex-col md:flex-row bg-white xl:rounded-lg md:m-4">
        <div className="md:w-[40%] xl:w-1/2 w-full text-white bg-red-400 flex items-center justify-center flex-col gap-3 min-h-[300px] xl:rounded-lg">
          <h1 className="text-4xl">{t("title")}</h1>
          <p className="text-xl">{t("haveAccount")}</p>
          <Button
            variant="outline"
            className="border-white bg-transparent rounded-xl"
          >
            {t("signIn")}
          </Button>
        </div>
        <div className="flex items-center justify-center flex-1 w-full p-3">
          <form onSubmit={handleSignUp} className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-4">{t("signUp")}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                {t("name")}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 outline-red-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-bold mb-2">
                {t("gender")}
              </label>
              <Select
                value={gender}
                onValueChange={(gender: string) => setGender(gender)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Nam</SelectItem>
                  <SelectItem value="false">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 outline-red-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 outline-red-400"
              />
            </div>
            {loading ? (
              <Button
                disabled
                type="submit"
                className="bg-red-400 text-white font-bold py-2 px-4 rounded w-full"
              >
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                {t("signUp")}
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-red-400 text-white font-bold py-2 px-4 rounded w-full"
              >
                {t("signUp")}
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { profileAtom } from "@/shared/store/atoms/profileAtom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { SlSocialFoursqare } from "react-icons/sl";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
import { IoMdClose, IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import male from "public/images/male.jpg";
import female from "public/images/male.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { authAtom } from "@/shared/store/atoms/authAtom";
import { enqueueSnackbar } from "notistack";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const router = useRouter();

  const [value, setValue] = useState("");
  const [authState, setAuthState] = useRecoilState(authAtom);
  const profile = useRecoilValue(profileAtom);
  const resetProfile = useResetRecoilState(profileAtom);

  const handleHome = () => {
    router.replace("/home");
  };

  const handleClear = () => {
    setValue("");
  };

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      accessToken: undefined,
      remember: false,
    });

    resetProfile();

    enqueueSnackbar("Logged out successfully", {
      variant: "success",
      autoHideDuration: 1000,
    });

    // Redirect to login page
    router.replace("/login");
  };

  return (
    <div className="container mx-auto mt-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <SlSocialFoursqare
          className="text-5xl p-1 text-white rounded-xl bg-blue-400 cursor-pointer"
          onClick={handleHome}
        />

        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search ..."
            className="pr-10"
          />
          {value ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={handleClear}
            >
              <IoMdClose className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          ) : (
            <CiSearch className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex gap-2 h-full">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          className="border-white text-white bg-blue-400 rounded-full"
        >
          <MdOutlineMessage />
        </Button>

        <Button
          variant="ghost"
          className="border-white text-white bg-blue-400 rounded-full"
        >
          <IoIosNotificationsOutline />
        </Button>

        <Button
          variant="ghost"
          className="border-white text-white bg-blue-400 rounded-full"
        >
          <TbSettings />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              {profile.imageUrl ? (
                <AvatarImage
                  src={profile.imageUrl}
                  alt={`avatar của ${profile.name}`}
                />
              ) : (
                <AvatarImage
                  src={profile.gender ? male.src : female.src}
                  alt="Avatar Default"
                />
              )}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;

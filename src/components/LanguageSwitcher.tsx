"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslations();
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  const languages = ["en", "vi"];

  useEffect(() => {
    // Retrieve language from localStorage on component mount
    const savedLocale = localStorage.getItem("language") || "en";
    if (savedLocale !== currentLocale) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const handleLocaleChange = (locale: string) => {
    // Store the selected locale and update cookie
    localStorage.setItem("language", locale);
    setCurrentLocale(locale);

    const newPathname = pathname.startsWith(`/${currentLocale}`)
      ? pathname.replace(`/${currentLocale}`, `/${locale}`)
      : `/${locale}${pathname}`;

    setCurrentLocale(locale);
    i18n.changeLanguage(locale); // Update i18n instance
    router.push(newPathname);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => {
          return (
            <SelectItem key={language} value={language} className="capitalize">
              {language}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

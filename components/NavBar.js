import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const renderTheme = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon className="w-6 h-6" onClick={() => setTheme("light")} />
      );
    } else {
      return (
        <MoonIcon className="w-6 h-6" onClick={() => setTheme("dark")} />
      );
    }
  };
  return (
    <div className="flex sticky flex-row z-20 bg-white/30 justify-between items-center w-full py-4 px-8 top-0 backdrop-blur-md">
      <h1 className="font-bold text-xl">Cocktails</h1>
      <div className="flex flex-row justify-between w-1/6 mr-6">
        {renderTheme()}
        <h1 className="font-semibold">Home</h1>
        <h1 className="font-semibold">About</h1>
      </div>
    </div>
  );
};

export default NavBar;

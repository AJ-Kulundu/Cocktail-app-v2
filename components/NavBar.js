import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, XIcon, MenuIcon } from "@heroicons/react/solid";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const renderTheme = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <SunIcon className="w-6 h-6" onClick={() => setTheme("light")} />;
    } else {
      return <MoonIcon className="w-6 h-6" onClick={() => setTheme("dark")} />;
    }
  };

  const menuToggle = () => {
    if (isOpen) {
      return <XIcon className="w-6 h-6" onClick={() => setIsOpen(false)} />;
    } else {
      return <MenuIcon className="w-6 h-6" onClick={() => setIsOpen(true)} />;
    }
  };
  return (
    <div className="flex sticky flex-col z-20 bg-white/30 top-0 shadow-sm backdrop-blur-md">
      <div className="flex flex-row justify-between items-center w-full py-4 px-8">
      <h1 className="font-bold text-xl">Cocktails</h1>
      <div className="hidden md:flex flex-row justify-between w-1/6 mr-6">
        {renderTheme()}
        <h1 className="font-semibold">Home</h1>
        <h1 className="font-semibold">About</h1>
      </div>
      <div className="flex md:hidden flex-row justify-between w-1/5 ">
        {renderTheme()}
        {menuToggle()}
      </div>
      </div>
      {isOpen && (
        <div className="relative flex flex-col sm:display-inline md:hidden w-full p-4 gap-y-2 justify-center items-center">
          <h1 className="font-semibold">Home</h1>
          <h1 className="font-semibold">About</h1>
        </div>
      )}
    </div>
  );
};

export default NavBar;

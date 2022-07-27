import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, XIcon, MenuIcon } from "@heroicons/react/solid";
import Link from "next/link";

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
        <h1 className="font-bold text-xl"><NavLink href={"/"}>Cocktails</NavLink></h1>
        <div className="hidden md:flex flex-row justify-between w-1/6">
          {renderTheme()}
          <NavLink href={"/"} isOpen={isOpen} setIsOpen={setIsOpen}>
            Home
          </NavLink>
          <NavLink href={"/about"} isOpen={isOpen} setIsOpen={setIsOpen}>
            About
          </NavLink>
        </div>
        <div className="flex md:hidden flex-row justify-between w-1/5">
          {renderTheme()}
          {menuToggle()}
        </div>
      </div>
      {isOpen && (
        <div className="relative flex flex-col sm:display-inline md:hidden w-full p-4 gap-y-2 justify-center items-center">
          <NavLink href={"/"} isOpen={isOpen} setIsOpen={setIsOpen}>
            Home
          </NavLink>
          <NavLink href={"/about"} isOpen={isOpen} setIsOpen={setIsOpen}>
            About
          </NavLink>
        </div>
      )}
    </div>
  );
};

const NavLink = ({ children, href, isOpen, setIsOpen }) => {
  return (
    <Link href={href} passHref>
      <a
        className="text-md font-semibold"
        onClick={isOpen && setIsOpen ? setIsOpen(false) : null}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavBar;

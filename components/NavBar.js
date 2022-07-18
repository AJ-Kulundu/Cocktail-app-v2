import React from "react";

const NavBar = () => {
  return (
    <div className="flex sticky flex-row z-20 bg-white/30 justify-between items-center w-full py-4 px-8 top-0 backdrop-blur-md">
      <h1 className="font-bold text-xl">Cocktails</h1>
      <div className="flex flex-row justify-between w-1/6 mr-6">
        <h1 className="font-semibold">Home</h1>
        <h1 className="font-semibold">About</h1>
      </div>
    </div>
  );
};

export default NavBar;

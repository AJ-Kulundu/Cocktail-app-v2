import React from "react";

const About = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full place-items-center h-screen p-4 md:p-8 lg:px-8">
      <p className="text-xl tracking-wide">
        This app was built using an API from{" "}
        <a
          className="hover:font-semibold underline"
          href="https://thecocktaildb.com/"
        >
          thecocktaildb.com
        </a>
        . An open, crowd-sourced database of drinks and cocktails from around
        the world.
      </p>
      <p className="text-xl tracking-wide">
        If you like the site, please consider supporting them on Patreon by
        clicking{" "}
        <a
          className="hover:font-semibold underline"
          href="https://www.patreon.com/thedatadb"
        >
          here
        </a>
      </p>
      <p className="text-xl tracking-wide items-center">
        The source code for the project can be found{" "}
        <a
          className="hover:font-semibold underline"
          href="https://github.com/AJ-Kulundu/Cocktail-app-v2"
        >
          here
        </a>
      </p>
    </div>
  );
};

export default About;

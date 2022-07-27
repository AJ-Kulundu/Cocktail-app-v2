import React from "react";
import Head from "next/head";

const Header = () => {
  return (
    <Head>
      <title>Cocktail app V2</title>
      <meta name="description" content="A website to show Cocktails" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/martini-glass-solid.svg" />
    </Head>
  );
};

export default Header;
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { booleanFilter } from '../utils/BooleanFilter';

const DisplayDrink = ({ cocktail }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <div className="group">
      <div className="flex flex-col rounded-lg px-6 py-4 gap-y-2">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
          <Image
            alt={cocktail.strDrink}
            src={
              !cocktail.strDrinkThumb
                ? "https://bit.ly/placeholder-img"
                : cocktail.strDrinkThumb
            }
            layout="fill"
            objectFit="cover"
            className={booleanFilter(
              "duration-700 ease-in-out group-hover:opacity-75",
              loading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
            onClick={() => router.push(`/${cocktail.idDrink}`)}
          />
        </div>
        <a 
        href={`/${cocktail.idDrink}`}
          className="text-md hover:underline font-medium group-hover:tracking-wide group-hover:font-bold"
          onClick={() => router.push(`/${cocktail.idDrink}`)}
        >
          {cocktail.strDrink}
        </a>
        <h3 className="text-lg">{cocktail.strCategory}</h3>
      </div>
    </div>
  );
};

export default DisplayDrink;

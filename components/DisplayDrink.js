import React, { useState } from 'react';
import Image from 'next/image';

function booleanFilter (...classes) {
    return classes.filter(Boolean).join(' ')
}


const DisplayDrink = (cocktail) => {
    const [loading,setLoading] = useState(true);
  
    return(
        <div className='flex flex-col rounded-lg px-6 py-4 gap-y-2 shadow-md'>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
        <Image
          alt=" "
          src={!cocktail.cocktail.strDrinkThumb ? "https://bit.ly/placeholder-img" : cocktail.cocktail.strDrinkThumb}
          layout="fill"
          objectFit="cover"
          className={booleanFilter(
            "duration-700 ease-in-out group-hover:opacity-75",
            loading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
        </div>
        <h1>{cocktail.cocktail.strDrink}</h1>
        <h3>{cocktail.cocktail.strCategory}</h3>
        </div>
    )
}

export default DisplayDrink
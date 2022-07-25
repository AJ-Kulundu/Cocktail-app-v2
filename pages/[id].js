import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../components/Loader";
import Image from "next/image";
import { booleanFilter } from "../utils/BooleanFilter";

export const getServerSideProps = async (context) => {
  const { params } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["cocktail"], () =>
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params}`)
      .then((response) => response.data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Cocktail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, data, error } = useQuery(["cocktail", id], () =>
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  );
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {isError ? (
        <div className="flex w-full justify-center p-4">
          <h1>Error: {error}</h1>
        </div>
      ) : isLoading ? (
        <div className="flex w-full justify-center p-4">
          <Loading />
        </div>
      ) : (
        <div>
          {data?.data?.drinks ? (
            <div className="flex flex-row p-4 ">
              <div className="flex flex-col md:w-1/5 md:h-1/5 gap-y-2 justify-start">
                <h1 className="text-xl font-bold tracking-wide">
                  {data?.data?.drinks[0]?.strDrink}
                </h1>
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                  <Image
                    alt={data?.data?.drinks[0]?.strDrink}
                    src={
                      !data?.data?.drinks[0]?.strDrinkThumb
                        ? "https://bit.ly/placeholder-img"
                        : data?.data?.drinks[0]?.strDrinkThumb
                    }
                    layout="fill"
                    objectFit="cover"
                    className={booleanFilter(
                      "duration-700 ease-in-out hover:opacity-75",
                      loading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    )}
                    onLoadingComplete={() => setLoading(false)}
                    onClick={() => router.push(`/${cocktail.idDrink}`)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div> Not found </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cocktail;

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
    <div className="md:min-h-screen lg:h-fit">
      {isError ? (
        <div className="flex w-full justify-center p-4">
          <h1>Error: {error}</h1>
        </div>
      ) : isLoading ? (
        <div >
          <Loading />
        </div>
      ) : (
        <div>
          {data?.data?.drinks ? (
            <div >
              <div className="flex sm:flex-col md:flex-row p-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-6 sm:gap-y-4 md:gap-y-0">
                  <div className="flex flex-col gap-y-2 justify-start ">
                    <h1 className="text-xl font-bold tracking-wide">
                      {data?.data?.drinks[0]?.strDrink}
                    </h1>
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg lg:mr-8">
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
                  <div className="flex flex-col gap-y-4">
                    <h1 className="text-xl font-bold tracking-wide mb-2 sm:my-2 md:my-0">
                      {" "}
                      Ingredients
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data?.data?.drinks[0]?.strIngredient1 == null ? null : (
                        <div>
                          <Image
                            alt={data?.data?.drinks[0]?.strIngredient1}
                            src={`https://www.thecocktaildb.com/images/ingredients/${data?.data?.drinks[0]?.strIngredient1}-Medium.png`}
                            width={100}
                            height={100}
                          />
                          <h1 className="font-medium items-center">
                            {data?.data?.drinks[0]?.strIngredient1}
                          </h1>
                        </div>
                      )}
                      {data?.data?.drinks[0]?.strIngredient2 == null ? null : (
                        <div>
                          <Image
                            alt={data?.data?.drinks[0]?.strIngredient2}
                            src={`https://www.thecocktaildb.com/images/ingredients/${data?.data?.drinks[0]?.strIngredient2}-Medium.png`}
                            width={100}
                            height={100}
                          />
                          <h1 className="font-medium ">
                            {data?.data?.drinks[0]?.strIngredient2}
                          </h1>
                        </div>
                      )}
                      {data?.data?.drinks[0]?.strIngredient3 == null ? null : (
                        <div>
                          <Image
                            alt={data?.data?.drinks[0]?.strIngredient3}
                            src={`https://www.thecocktaildb.com/images/ingredients/${data?.data?.drinks[0]?.strIngredient3}-Medium.png`}
                            width={100}
                            height={100}
                          />
                          <h1 className="font-medium ">
                            {data?.data?.drinks[0]?.strIngredient3}
                          </h1>
                        </div>
                      )}
                      {data?.data?.drinks[0]?.strIngredient4 == null ? null : (
                        <div>
                          <Image
                            alt={data?.data?.drinks[0]?.strIngredient4}
                            src={`https://www.thecocktaildb.com/images/ingredients/${data?.data?.drinks[0]?.strIngredient4}-Medium.png`}
                            width={100}
                            height={100}
                          />
                          <h1 className="font-medium ">
                            {data?.data?.drinks[0]?.strIngredient4}
                          </h1>
                        </div>
                      )}
                      {data?.data?.drinks[0]?.strIngredient5 == null ? null : (
                        <div>
                          <Image
                            alt={data?.data?.drinks[0]?.strIngredient5}
                            src={`https://www.thecocktaildb.com/images/ingredients/${data?.data?.drinks[0]?.strIngredient5}-Medium.png`}
                            width={100}
                            height={100}
                          />
                          <h1 className="font-medium ">
                            {data?.data?.drinks[0]?.strIngredient5}
                          </h1>
                        </div>
                      )}
                      {data?.data?.drinks[0]?.strIngredient6 == null ? null : (
                        <div>
                          <Image
                            alt={data?.data?.drinks[0]?.strIngredient6}
                            src={`https://www.thecocktaildb.com/images/ingredients/${data?.data?.drinks[0]?.strIngredient6}-Medium.png`}
                            width={100}
                            height={100}
                          />
                          <h1 className="font-medium ">
                            {data?.data?.drinks[0]?.strIngredient6}
                          </h1>
                        </div>
                      )}
                    </div>
                    <h1 className="text-xl font-bold tracking-wide mb-2 sm:my-2 md:my-0">
                      Instructions
                    </h1>
                    <p className="text-md">
                      {data?.data?.drinks[0]?.strInstructions}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 gap-y-4">
                <h1 className="text-xl font-bold tracking-wide mb-2 sm:my-2 md:my-0">
                  Other Details
                </h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                  {data?.data?.drinks[0]?.strCategory != null ? (
                    <div className="flex flex-row items-center">
                      <h1 className="text-md uppercase font-medium">
                        Category
                      </h1>{" "}
                      :
                      <p className="text-md capitalize">
                        &nbsp;{data?.data?.drinks[0]?.strCategory}
                      </p>
                    </div>
                  ) : null}
                  {data?.data?.drinks[0]?.strAlcoholic != null ? (
                    <div className="flex flex-row items-center">
                      <h1 className="text-md uppercase font-medium">Type</h1> :
                      <p className="text-md capitalize">
                        &nbsp;{data?.data?.drinks[0]?.strAlcoholic}
                      </p>
                    </div>
                  ) : null}
                  {data?.data?.drinks[0]?.strGlass != null ? (
                    <div className="flex flex-row items-center">
                      <h1 className="text-md uppercase font-medium">Glass</h1> :
                      <p className="text-md capitalize">
                        &nbsp;{data?.data?.drinks[0]?.strGlass}
                      </p>
                    </div>
                  ) : null}
                  {data?.data?.drinks[0]?.strIBA != null ? (
                    <div className="flex flex-row items-center">
                      <h1 className="text-md uppercase font-medium">IBA</h1> :
                      <p className="text-md capitalize">
                        &nbsp;{data?.data?.drinks[0]?.strIBA}
                      </p>
                    </div>
                  ) : null}
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

import axios from "axios";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import DisplayDrink from "../components/DisplayDrink";
import Loading from "../components/Loader";

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("cocktails", () =>
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const [search, setSearch] = useState("");
  const { isLoading, isError, data, error } = useQuery(
    ["cocktails", search],
    () =>
      axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      )
  );
  return (
    <div className="px-6 py-8">
      {error ? null : (
        <div className="flex  mb-2 w-full justify-center ">
          <div className="flex flex-col gap-y-2 p-4 bg-white/30 rounded-lg items-center shadow-sm z-10">
          <h1 className="capitalize sm:text-md md:text-lg md:tracking-wide">Search Your favourite cocktail</h1>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 p-2 rounded-lg"
            placeholder="Search"
          />
          </div>
        </div>
      )}
      {isError ? (
        <div className="flex w-full justify-center p-4">
          <h1>Error: {error}</h1>
        </div>
      ) : isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {data?.data?.drinks ? (
              data?.data?.drinks.map((drink, id) => (
                <DisplayDrink key={id} cocktail={drink} />
              ))
            ) : (
              <div className="flex w-full justify-center p-4">
                {" "}
                <h1>Cocktail not found</h1>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

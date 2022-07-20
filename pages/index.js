import axios from "axios";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import DisplayDrink from "../components/DisplayDrink";
import Loading from "../components/Loader";

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["cocktails"], () =>
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => (data = response.data))
      .catch((err) => (error = err))
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
        <div className="flex p-4 mb-2 w-full justify-center">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
      )}
      {isError ? (
        <div className="flex w-full justify-center p-4">
          <h1>Error: {error}</h1>
        </div>
      ) : isLoading ? (
        <div className="flex w-full justify-center p-4">
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

import axios from "axios";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import DisplayDrink from "../components/DisplayDrink";

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["cocktails"], () =>
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => (data = response.data))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const [search, setSearch] = useState("");
  const { isLoading, isSuccess, isError, data, error } = useQuery(
    ["cocktails", search],
    () =>
      axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      )
  );
  return (
    <div>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 p-6">
      {data?.data?.drinks.map((drink, id) => (
        <DisplayDrink key={id} cocktail={drink} />
      ))}
    </div>
    </div>
  );
}

import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../components/Loader";

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
  const { isLoading, isError, data, error } = useQuery(["cocktails", id], () =>
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  );
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
        {data?.data?.drinks ?(
        <div>Cocktail:{data?.data?.drinks[0]?.strDrink}</div> ): (<div> Not found </div>) }
        </div>
      )}
    </div>
  );
};

export default Cocktail;

import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';


export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient()
 let data;
  const getCocktails=() => axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => data = response.data)
  await queryClient.prefetchQuery('cocktails',getCocktails)
 //await axios.get('www.thecocktaildb.com/api/json/v1/1/search.php?f=a').then((response) => cocktails = response.data)
 
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}


export default function Home() {
  let data;
  const getCocktails=() => axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => data = response.data)
  const {data: mn} = useQuery('cocktails', getCocktails)
  console.log(mn)
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

import { useContext } from 'react';
import ApiContext from '../context/ApiContext';

export default function useApiRequest() {
  const { setApi } = useContext(ApiContext);

  const request = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    try {
      const data = await response.json();
      // console.log(data.results);
      setApi(data.results);
    } catch (e) {
      console.log(e.message);
    }
  };

  return {
    request,
  };
}

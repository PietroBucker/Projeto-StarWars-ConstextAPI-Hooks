import { useEffect, useState } from 'react';

export default function useApiRequest() {
  // const { setApi, setLoading } = useContext(ApiContext);
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [test, setTest] = useState([]);

  const request = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      // console.log(data.results);
      setApi(data.results);
      setFiltered(data.results);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return {
    api,
    loading,
    setApi,
    setLoading,
    filtered,
    setFiltered,
    test,
    setTest,
  };
}

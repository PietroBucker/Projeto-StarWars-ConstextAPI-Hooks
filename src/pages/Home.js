import React, { useEffect } from 'react';
import Table from '../components/Table';
import useApiRequest from '../hooks/useApiRequest';

export default function Home() {
  const api = useApiRequest();

  useEffect(() => {
    api.request();
  }, []);

  return (
    <Table />
  );
}

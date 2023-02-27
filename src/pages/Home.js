import React, { useContext } from 'react';
import Loading from '../components/Loading';
import Table from '../components/Table';
import ApiContext from '../context/ApiContext';

export default function Home() {
  const { loading } = useContext(ApiContext);

  return (
    <div>
      {loading ? <Loading /> : <Table />}
    </div>
  );
}

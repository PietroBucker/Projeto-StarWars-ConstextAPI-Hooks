import React, { useContext } from 'react';
import Loading from '../components/Loading';
import Table from '../components/Table';
import ApiContext from '../context/ApiContext';
import logo from '../logoStarWars.svg';

export default function Home() {
  const { loading } = useContext(ApiContext);

  return (
    <div className="logo-star-wars">
      <img src={ logo } alt="star-wars" className="m-auto" />
      {loading ? <Loading /> : <Table />}
    </div>
  );
}

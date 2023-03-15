import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';
import Search from './Search';

export default function Table() {
  const { test } = useContext(ApiContext);

  const titlesTable = ['Name', 'Rotation Period', 'Orbital Perio', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];
  return (
    <div className="border-2 p-3 m-5 mt-0 -translate-y-7 overflow-auto rounded-xl">
      <Search />
      <table className="scroll-mx-1 overflow-auto table-fixed">
        <thead>
          <tr>
            {titlesTable.map((title, ind) => (
              <th key={ ind } className="border-2">{title}</th>))}
          </tr>
        </thead>
        <tbody>
          {test.map((element) => (
            <tr key={ element.name } className="border-2 text-center">
              <td data-testid="planet-name">{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td className="p-5 indent-2 ">{element.films}</td>
              <td className="p-3">{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

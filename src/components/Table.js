import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';
import Search from './Search';

export default function Table() {
  const { test } = useContext(ApiContext);

  const titlesTable = ['Name', 'Rotation Period', 'Orbital Perio', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];
  return (
    <div>
      <h1>STAR WARS</h1>
      <Search />
      <table>
        <thead>
          <tr>
            {titlesTable.map((title, ind) => (<th key={ ind }>{title}</th>))}
          </tr>
        </thead>
        <tbody>
          {test.map((element) => (
            <tr key={ element.name }>
              <td data-testid="planet-name">{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

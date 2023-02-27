import React from 'react';
import useHandleSarch from '../hooks/useHandleSarch';

export default function Search() {
  const { filter, handleChange } = useHandleSarch();

  return (
    <label htmlFor="filter">
      Pesquisar
      <input
        id="filters"
        name="filters"
        value={ filter.filter }
        onChange={ handleChange }
        data-testid="name-filter"
      />
    </label>
  );
}

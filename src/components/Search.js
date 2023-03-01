import React from 'react';
import useHandleSarch from '../hooks/useHandleSarch';

export default function Search() {
  const { filter, selected, handleChangeFilters,
    handleChange, handleClick } = useHandleSarch();
  const { filters, valueFilter } = filter;
  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  return (
    <section>
      <label htmlFor="filter">
        Pesquisar
        <input
          id="filters"
          name="filters"
          value={ filters }
          onChange={ handleChangeFilters }
          data-testid="name-filter"
        />
      </label>

      <label htmlFor="columnFilter">
        <select
          name="columnFilter"
          id="columnFilter"
          data-testid="column-filter"
          onChange={ handleChange }
        >
          {options.map((element, ind) => (
            <option key={ ind } value={ element }>{ element }</option>
          ))}
        </select>
      </label>

      <label htmlFor="comparisonFilter">
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="valueFilter">
        <input
          id="valueFilter"
          name="valueFilter"
          value={ valueFilter }
          onChange={ handleChange }
          data-testid="value-filter"
        />
      </label>
      <button data-testid="button-filter" onClick={ handleClick }>Filtrar</button>
      {selected.map((element) => (
        <div
          key={ element.colum }
        >
          {element.colum}
          {' '}
          {element.condition}
          {' '}
          {element.value}
        </div>))}
    </section>
  );
}

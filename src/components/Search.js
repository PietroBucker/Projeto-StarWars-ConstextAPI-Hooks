import React from 'react';
import useHandleSarch from '../hooks/useHandleSarch';

export default function Search() {
  const { filter, selected, handleChangeFilters,
    handleChange, handleClick, options, hadleRemoveFilter,
    handleRemoveAllFilters, handleSort } = useHandleSarch();
  const { filters, valueFilter } = filter;
  // const options = ['population', 'orbital_period',
  //   'diameter', 'rotation_period', 'surface_water'];
  const selectedColum = selected.map((el) => el.colum);

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
          value={ filter.columnFilter }
          data-testid="column-filter"
          onChange={ handleChange }
          onClick={ handleChange }

        >
          {selectedColum.includes('population') ? ''
            : (
              <option
                value="population"
              >
                population
              </option>
            )}
          {selectedColum.includes('orbital_period') ? ''
            : (
              <option
                value="orbital_period"
              >
                orbital_period
              </option>
            )}
          {selectedColum.includes('diameter') ? ''
            : (
              <option
                value="diameter"
              >
                diameter
              </option>
            )}
          {selectedColum.includes('rotation_period') ? ''
            : (
              <option
                value="rotation_period"
              >
                rotation_period
              </option>
            )}
          {selectedColum.includes('surface_water') ? ''
            : (
              <option
                value="surface_water"
              >
                surface_water
              </option>
            )}
          {/* {opt.map((element, ind) => (
            <option key={ ind } value={ element }>{ element }</option>
          ))} */}
        </select>
      </label>

      <label htmlFor="comparisonFilter">
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          value={ filter.comparisonFilter }
          data-testid="comparison-filter"
          onChange={ handleChange }
          onClick={ handleChange }
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
      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar

      </button>
      {selected.map((element) => (
        <div
          key={ element.colum }
          data-testid="filter"
        >
          {element.colum}
          {' '}
          {element.condition}
          {' '}
          {element.value}
          <button name={ element.colum } onClick={ hadleRemoveFilter }>💢</button>
        </div>))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todas filtragens
      </button>

      <select
        data-testid="column-sort"
        name="columSort"
        value={ filter.columSort }
        onChange={ handleChange }
        onClick={ handleChange }
      >
        {options.map((element, ind) => (
          <option key={ ind } value={ element }>{ element }</option>
        ))}
      </select>

      <label data-testid="column-sort-input-asc" htmlFor="conditionSort">
        <input
          id="conditionSort"
          name="conditionSort"
          type="radio"
          value="ASC"
          onChange={ handleChange }
        />
        Ascendente
      </label>

      <label data-testid="column-sort-input-desc" htmlFor="conditionSort2">
        <input
          id="conditionSort2"
          name="conditionSort"
          type="radio"
          value="DESC"
          onChange={ handleChange }
        />
        Descendente
      </label>

      <button data-testid="column-sort-button" onClick={ handleSort }>Ordenar</button>
    </section>
  );
}

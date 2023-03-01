import { useContext, useState, useCallback } from 'react';
import ApiContext from '../context/ApiContext';

const INITIAL_STATE = {
  filters: '',
  columnFilter: 'population',
  comparisonFilter: 'maior que',
  valueFilter: 0,
};

export default function useHandleSarch() {
  const [filter, setFilter] = useState(INITIAL_STATE);
  const [selected, setSelected] = useState([]);
  const { api, setFiltered, filtered } = useContext(ApiContext);

  const filterByText = useCallback((value) => {
    const filterede = api.filter((element) => (element.name.toLowerCase())
      .includes(value));
    setFiltered(filterede);
    setSelected([]);
    return filterede;
  }, [api, setFiltered]);

  const outrofilterByText = useCallback(() => {
    const filterede = filtered.filter((element) => (element.name.toLowerCase())
      .includes(filter.filters));
    setFiltered(filterede);
    return filterede;
  }, [filter.filters, filtered, setFiltered]);

  const multFilter = () => {
    setSelected([
      ...selected,
      { colum: filter.columnFilter,
        condition: filter.comparisonFilter,
        value: filter.valueFilter,
      },
    ]);
    const mult = outrofilterByText().filter((element) => {
      switch (filter.comparisonFilter) {
      case 'maior que':
        return Number(element[filter.columnFilter]) > Number(filter.valueFilter);
      case 'menor que':
        return Number(element[filter.columnFilter]) < Number(filter.valueFilter);
      case 'igual a':
        return Number(element[filter.columnFilter]) === Number(filter.valueFilter);
      default:
        return true;
      }
    });
    setFiltered(mult);
  };

  const handleChangeFilters = ({ target }) => {
    const { value } = target;
    filterByText(value);
    setFilter({
      ...filter,
      filters: value.toLowerCase(),
    });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleClick = () => {
    multFilter();
  };

  // const hadleRemoveFilter = () => {

  // };

  return {
    filter,
    selected,
    handleChangeFilters,
    handleChange,
    handleClick,
  };
}

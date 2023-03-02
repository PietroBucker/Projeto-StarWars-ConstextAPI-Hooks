import { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/ApiContext';

const INITIAL_STATE = {
  filters: '',
  columnFilter: 'population',
  comparisonFilter: 'maior que',
  valueFilter: 0,
  columSort: 'population',
  conditionSort: '',
};
const options = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

let selected = [];
export default function useHandleSarch() {
  const [filter, setFilter] = useState(INITIAL_STATE);
  // const [selected, setSelected] = useState([]);
  const [opt, setOpt] = useState(options);
  const { api, setFiltered, filtered, setTest, test } = useContext(ApiContext);

  const filterByText = (value) => {
    const filterede = api.filter((element) => (element.name.toLowerCase())
      .includes(value));
    setFiltered(filterede);
    // setTest(filterede)
    // selected = [];
  };
  useEffect(() => {
    const mult = filtered.filter((element) => {
      const newArr = selected.map((sel) => {
        switch (sel.condition) {
        case 'maior que':
          return Number(element[sel.colum]) > Number(sel.value);
        case 'menor que':
          return Number(element[sel.colum]) < Number(sel.value);
        case 'igual a':
          return Number(element[sel.colum]) === Number(sel.value);
        default:
          return true;
        }
      });
      return newArr.every((el) => el);
    });
    // setFiltered(mult);
    setTest(mult);
  }, [filter.filters, setFiltered, opt, filter.columSort, setTest]);

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
    console.log(value);
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const optionsChange = () => {
    const changed = opt.filter((element) => !element.includes(filter.columnFilter));
    setOpt(changed);
    setFilter({
      ...filter,
      columnFilter: changed[0],
    });
  };

  const handleClick = () => {
    selected.push(
      { colum: filter.columnFilter,
        condition: filter.comparisonFilter,
        value: filter.valueFilter,
      },
    );
    optionsChange();
  };

  const hadleRemoveFilter = ({ target }) => {
    const { name } = target;
    const teste = selected.filter((el) => !el.colum.includes(name));
    console.log(teste);
    selected = teste;
    setFilter({
      ...filter,
      columnFilter: name,
    });
    setOpt([...opt]);
  };

  const handleRemoveAllFilters = () => {
    selected = [];
    setOpt([...opt]);
  };

  // const sortString = (newArr) => {
  //   const n = -1;
  //   console.log('aqui');
  //   if (filter.conditionSort === 'ASC') {
  //     const sorted = newArr.sort((a, b) => {
  //       if (a[filter.columSort] > b[filter.columSort]) return 1;
  //       if (a[filter.columSort] < b[filter.columSort]) return n;
  //       return 0;
  //     });
  //     setTest(sorted);
  //   }
  //   if (filter.conditionSort === 'DESC') {
  //     const sorted = newArr.sort((a, b) => {
  //       if (a.name > b.name) return n;
  //       if (a.name < b.name) return 1;
  //       return 0;
  //     });
  //     setTest(sorted);
  //   }
  // };

  const sortNumbers = (newArr) => {
    const n = -1;
    console.log('aqui');
    if (filter.conditionSort === 'ASC') {
      const sorted = newArr.sort((a, b) => {
        if (a[filter.columSort] > b[filter.columSort]) return 1;
        if (a[filter.columSort] < b[filter.columSort]) return n;
        return 0;
      }).sort((a, b) => a[filter.columSort] - b[filter.columSort]);
      setTest(sorted);
    }
    if (filter.conditionSort === 'DESC') {
      const sorted = newArr.sort((a, b) => b[filter.columSort] - a[filter.columSort]);
      setTest(sorted);
    }
  };

  const handleSort = () => {
    const newArr = test.map((el) => el);
    sortNumbers(newArr);

    // setFilter({ ...filter });
  };

  return {
    filter,
    selected,
    opt,
    options,
    handleChangeFilters,
    handleChange,
    handleClick,
    hadleRemoveFilter,
    handleRemoveAllFilters,
    handleSort,
  };
}

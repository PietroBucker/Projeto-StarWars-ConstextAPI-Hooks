import { useContext, useState } from 'react';
import ApiContext from '../context/ApiContext';

const INITIAL_STATE = {
  filterText: '',
};

export default function useHandleSarch() {
  const [filter, setFilter] = useState(INITIAL_STATE);
  const { api, setFiltered } = useContext(ApiContext);

  const filterByText = (name) => {
    const filtered = api.filter((element) => element.name.includes(name));
    setFiltered(filtered);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({ [name]: value });
    filterByText(value);
  };

  return {
    filter,
    handleChange,
  };
}

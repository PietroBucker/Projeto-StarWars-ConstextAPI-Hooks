import React from 'react';
import { PropTypes } from 'prop-types';
import ApiContext from './ApiContext';
import useApiRequest from '../hooks/useApiRequest';

export default function ApiProvider({ children }) {
  // const [api, setApi] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { api, setApi, loading, setLoading, filtered, setFiltered } = useApiRequest();

  return (
    <ApiContext.Provider
      value={ {
        api,
        setApi,
        loading,
        setLoading,
        filtered,
        setFiltered } }
    >
      {children}
    </ApiContext.Provider>
  );
}
ApiProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

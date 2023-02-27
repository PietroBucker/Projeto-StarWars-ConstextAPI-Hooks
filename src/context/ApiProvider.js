import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import ApiContext from './ApiContext';

export default function ApiProvider({ children }) {
  const [api, setApi] = useState([]);
  return (
    <ApiContext.Provider value={ { api, setApi } }>
      {children}
    </ApiContext.Provider>
  );
}
ApiProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

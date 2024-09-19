
import PropTypes from 'prop-types';
import React, { createContext, useState, useMemo } from 'react';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [matchedUser, setMatchedUser] = useState(null);
    const value = useMemo(() => ({ matchedUser, setMatchedUser }), [matchedUser, setMatchedUser]);
  
    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    );
  };
  
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
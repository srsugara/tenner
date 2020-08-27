import React, { useState, createContext } from 'react';

const AppContext = () => {
  const NameContext = createContext();

  const NameProvider = (props) => {
    const [name, setName] = useState('');
    const nameState = { name, setName };
    return (
      <NameContext.Provider value={nameState}>
        {props.children}
      </NameContext.Provider>
    );
  };

  return {
    NameContext,
    NameProvider,
  };
}

export default AppContext();

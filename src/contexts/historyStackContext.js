import React, {useState, createContext, useContext} from 'react';

const HistoryStackContext = createContext({currentScreen: 'mc'});

export const HistoryStackProvider = ({children}) => {
  const [currentScreen, setCurrentScreen] = useState('mc');

  const provider = {
    currentScreen,
    changeCurrentScreen: newScreen => setCurrentScreen(newScreen),
  };

  return (
    <HistoryStackContext.Provider value={provider}>
      {children}
    </HistoryStackContext.Provider>
  );
};

export const useHistoryStack = () => {
  const context = useContext(HistoryStackContext);
  if (context === undefined) {
    throw new Error(
      'useHistoryStack can only be used inside HistoryStackProvider',
    );
  }
  return context;
};

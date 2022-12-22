import React, {useState, createContext, useContext} from 'react';

const CurrentTagContext = createContext();

export const CurrentTagProvider = ({children}) => {
  const [decodedData, setDecodedData] = useState();
  const [rawData, setRawData] = useState();

  const provider = {
    decodedData,
    rawData,
    saveDecodedData: data => setDecodedData(data),
    saveRawData: data => setRawData(data),
  };

  return (
    <CurrentTagContext.Provider value={provider}>
      {children}
    </CurrentTagContext.Provider>
  );
};

export const useCurrentTag = () => {
  const context = useContext(CurrentTagContext);
  if (context === undefined) {
    throw new Error('useCurrentTag can only be used inside CurrentTagProvider');
  }
  return context;
};

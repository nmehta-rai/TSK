import React, {useState, createContext, useContext} from 'react';

const ScanQrContext = createContext();

export const ScanQrProvider = ({children}) => {
  const [moduleNum, setModuleNum] = useState(null);
  const [rawData1, setRawData1] = useState(null);
  const [rawData2, setRawData2] = useState(null);

  const provider = {
    rawData1,
    rawData2,
    moduleNum,
    saveRawData1: data => setRawData1(data),
    saveRawData2: data => setRawData2(data),
    saveModuleNum: data => setModuleNum(data),
  };

  return (
    <ScanQrContext.Provider value={provider}>{children}</ScanQrContext.Provider>
  );
};

export const useScanQr = () => {
  const context = useContext(ScanQrContext);
  if (context === undefined) {
    throw new Error('useScanQr can only be used inside ScanQrProvider');
  }
  return context;
};

import React, {createContext, useMemo, useState} from 'react';
import {ProviderInterface} from 'types/store';

interface CurrentUrlContextInterface {
  currentUrl: string | null;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CurrentUrlContext = createContext({} as CurrentUrlContextInterface);

export const CurrentUrlProvider = ({children}: ProviderInterface) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null); // for export mode

  const value = useMemo(
    () => ({
      currentUrl,
      setCurrentUrl,
    }),
    [currentUrl]
  );

  return <CurrentUrlContext.Provider value={value}>{children}</CurrentUrlContext.Provider>;
};

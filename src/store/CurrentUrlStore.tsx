import React, {createContext, useEffect, useMemo, useState} from 'react';
import {ProviderInterface} from 'types/store';
import {useHistory} from 'react-router-dom';

interface CurrentUrlContextInterface {
  currentUrl: string | null;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CurrentUrlContext = createContext({} as CurrentUrlContextInterface);

const {isExport} = window as any;

export const CurrentUrlProvider = ({children}: ProviderInterface) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null); // for export mode
  const history = useHistory();

  const value = useMemo(
    () => ({
      currentUrl,
      setCurrentUrl,
    }),
    [currentUrl]
  );

  useEffect(() => {
    if (currentUrl && !isExport) {
      history.push(`/${currentUrl[0] === '/' ? currentUrl.slice(1) : currentUrl}`);
    }
  }, [currentUrl]);

  return <CurrentUrlContext.Provider value={value}>{children}</CurrentUrlContext.Provider>;
};

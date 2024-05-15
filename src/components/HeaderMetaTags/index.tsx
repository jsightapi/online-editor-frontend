import React, {useContext, useMemo} from 'react';
import {Helmet} from 'react-helmet';
import {JDocContext} from 'store';
import {shorten} from 'utils/shorten';

export const HeaderMetaTags = () => {
  const {jdocExchange: jdocData} = useContext(JDocContext);

  const getTitle = (limit: number) => {
    if (jdocData?.info?.title) {
      const version = (jdocData.info.version || '').slice(20);
      const max = limit - (version ? version.length + 1 : 0);
      return shorten(jdocData.info.title, max) + ' ' + version;
    }
    return 'Untitled API';
  };

  const title = useMemo(() => {
    return getTitle(64);
  }, [jdocData?.info]);

  const description = useMemo(() => {
    if (jdocData?.info?.description) {
      const closingPhrase = 'Powered by editor.jsight.io ©';
      const max = 97 - closingPhrase.length;
      return shorten(jdocData.info.description, max) + ' ' + closingPhrase;
    }
    return 'Powered by editor.jsight.io ©';
  }, [jdocData?.info]);

  const twTitle = useMemo(() => {
    return getTitle(44);
  }, [jdocData?.info]);

  const twDescription = useMemo(() => {
    if (jdocData?.info?.description) {
      const closingPhrase = 'Powered by editor.jsight.io ©';
      const max = 98 - closingPhrase.length;
      return shorten(jdocData.info.description, max) + `\n` + closingPhrase;
    }
    return 'Powered by editor.jsight.io ©';
  }, [jdocData?.info]);

  if (!jdocData) {
    return null;
  }

  return (
    <Helmet>
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={twTitle} />
      <meta name="twitter:description" content={twDescription} />
    </Helmet>
  );
};

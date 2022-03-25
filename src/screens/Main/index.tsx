import React, {FC} from 'react';
import {Layout} from 'components/Layout';
import {MainContent} from 'components/MainContent';
import {jdoc} from 'api/getResources';

const MainScreen: FC = () => {
  return (
    <Layout isShowSidebar={true} isShowSettings={true} side="left">
      <MainContent jdocExchange={jdoc} showRightSidebar={true} />
    </Layout>
  );
};

export default MainScreen;

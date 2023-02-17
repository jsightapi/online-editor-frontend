import React, {Suspense, useState} from 'react';
import {
  Switch,
  BrowserRouter as Router,
  HashRouter,
  Route,
  useParams,
  useHistory,
} from 'react-router-dom';
import Modal from 'react-modal';
import EditorScreen from './screens/Editor';
import './styles/globals.scss';
import {HashRouterParams} from 'types';
import {SharingContext} from 'store/SharingStore';
import {CookieExceptShown} from 'components/Modals/CookieExceptShown';
import {CustomMessage} from 'components/Modals/CustomMessage';
import './components/Modals/style.scss';

const {isExport} = window as any;

const customMessageUrl = process.env.REACT_APP_CUSTOM_MESSAGE_URL;

const isCookieExceptModalOpen = !Boolean(localStorage.getItem('isCookieExceptShown'));

const onCookieExceptClose = () => localStorage.setItem('isCookieExceptShown', 'true');

if (isExport || isCookieExceptModalOpen) {
  Modal.setAppElement('#root');
}

const EditorWithPathScreen = () => {
  const history = useHistory();
  const {key, version} = useParams<HashRouterParams>();

  return (
    <SharingContext.Provider value={{key, version, history}}>
      <HashRouter hashType="noslash">
        <Switch>
          <Route path="/" exact component={EditorScreen} />
          <Route path="/:path+" exact component={EditorScreen} />
        </Switch>
      </HashRouter>
    </SharingContext.Provider>
  );
};

const App = () => {
  const [cookieModalOpened, setCookieModalOpened] = useState(isCookieExceptModalOpen);

  const onCloseCookieModal = () => {
    setCookieModalOpened(false);
    onCookieExceptClose();
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {cookieModalOpened ? (
          <CookieExceptShown onAccept={onCloseCookieModal} />
        ) : (
          customMessageUrl && <CustomMessage customMessageUrl={customMessageUrl} />
        )}
        <Switch>
          <Route path="/" exact component={EditorWithPathScreen} />
          <Route path="/r/:key/:version?" exact component={EditorWithPathScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

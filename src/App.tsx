import React, {Suspense} from 'react';
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
import './components/Modals/style.scss';

const {isExport} = window as any;

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
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {isCookieExceptModalOpen && <CookieExceptShown onAccept={onCookieExceptClose} />}
        <Switch>
          <Route path="/" exact component={EditorWithPathScreen} />
          <Route path="/r/:key/:version?" exact component={EditorWithPathScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

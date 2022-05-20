import React, {Suspense} from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Modal from 'react-modal';
import EditorScreen from './screens/Editor';
import './styles/globals.scss';
import './components/Modals/style.scss';
import {CookieExceptShown} from './components/Modals/CookieExceptShown';
const {isExport} = window as any;
if (isExport) {
  Modal.setAppElement('#root');
}

const isCookieExceptModalOpen = !Boolean(localStorage.getItem('isCookieExceptShown'));

const onCookieExceptClose = () => localStorage.setItem('isCookieExceptShown', 'true');

console.log({isCookieExceptModalOpen});

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {isCookieExceptModalOpen && (
          <CookieExceptShown isOpen={isCookieExceptModalOpen} onClose={onCookieExceptClose} />
        )}
        <Switch>
          <Route path="/" exact component={EditorScreen} />
          <Route path="/r/:key/:version" exact component={EditorScreen} />
          <Route path="/r/:key/:version/:path+" exact component={EditorScreen} />
          <Route path="/:path+" exact component={EditorScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

import React, {Suspense} from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Modal from 'react-modal';
import EditorScreen from './screens/Editor/EditorScreen.export';
import './styles/globals.scss';
import './components/Modals/style.scss';
Modal.setAppElement('#root');

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={EditorScreen} />
          <Route path="/:path+" exact component={EditorScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

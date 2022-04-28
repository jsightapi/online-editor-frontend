import React, {Suspense, FC} from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Modal from 'react-modal';
import EditorScreen from './screens/Editor';
import './styles/globals.scss';
import './components/Modals/style.scss';
const {isExport} = window as any;
if (isExport) {
  Modal.setAppElement('#root');
}

const App: FC = () => {
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

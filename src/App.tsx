import React, {Suspense, FC} from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Modal from 'react-modal';
import EditorScreen from './screens/Editor';
import './styles/globals.scss';
import './components/Modals/style.scss';
Modal.setAppElement('#root');

export interface AppProps {
  onlyDoc?: boolean;
}

const EditorScreenOnlyDoc = () => {
  return <EditorScreen onlyDoc={true} />;
};

const App: FC<AppProps> = ({onlyDoc}) => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={onlyDoc ? EditorScreenOnlyDoc : EditorScreen} />
          <Route path="/:path+" exact component={EditorScreen} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;

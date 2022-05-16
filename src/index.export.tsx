import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.export';

const container = document.getElementById('root');
if (container) {
  // @ts-ignore
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

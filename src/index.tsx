import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TagManager from 'react-gtm-module';
const {isExport} = window as any;

if (!isExport) {
  const gtmId = process.env.REACT_APP_GTM_ID;

  gtmId && TagManager.initialize({gtmId});
}

const container = document.getElementById('root');
if (container) {
  // @ts-ignore
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

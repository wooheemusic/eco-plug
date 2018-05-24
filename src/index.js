import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _App from './App';
import registerServiceWorker from './registerServiceWorker';
import { root } from './hoc/router';

const App = root(_App);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

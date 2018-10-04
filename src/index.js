import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import ContentStore from './stores/content';

import 'bootstrap/scss/bootstrap.scss';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const browserHistory = createBrowserHistory();

const stores = {
  routing: new RouterStore(),
  content: new ContentStore()
};

window.content = stores.content;

const history = syncHistoryWithStore(browserHistory, stores.routing);


ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import RequireAuth from './components/auth/require_auth';

import App from './components/app';
import Home from './components/home';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import SecurePage from './components/securepage';
import Signout from './components/auth/signout';
import UploadFile from './components/upload';

import { AUTH_USER } from './actions/types';

const middlewares = [ReduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="securepage" component={RequireAuth(SecurePage)} />
        <Route path="upload" component={RequireAuth(UploadFile)} />

      </Route>
    </Router>
  </Provider>
  ,document.getElementById('app')
);

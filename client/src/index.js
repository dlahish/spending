import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { throttle } from 'lodash';
import reducers from './reducers';
import RequireAuth from './components/auth/require_auth';


import App from './components/app';
import Home from './components/home';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Dashboard from './components/dashboard';
import Signout from './components/auth/signout';
import UploadFile from './components/upload';
import SigninAttempt from './components/auth/signin_attempt';
import NewRecord from './components/NewRecord';
import Categories from './components/Categories';
import Data from './components/Data';
import Reddit from './components/Reddit'

import { loadState, saveState } from './localStorage';

import { AUTH_USER } from './actions/types';

const middlewares = [ReduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

// const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
// const store = createStoreWithMiddleware(reducers, persistedState);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// store.subscribe(throttle(() => {
//   saveState({
//     data: store.getState().data
//   });
// }, 1000));

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Reddit} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signinattempt" component={SigninAttempt} />
        <Route path="dashboard" component={RequireAuth(Dashboard)} />
        <Route path="upload" component={RequireAuth(UploadFile)} />
        <Route path="newrecord" component={RequireAuth(NewRecord)} />
        <Route path="categories" component={RequireAuth(Categories)} />
        <Route path="data" component={RequireAuth(Data)} />
      </Route>
    </Router>
  </Provider>
  ,document.getElementById('app')
);

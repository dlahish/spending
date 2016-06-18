import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';

import App from './components/app';
import Home from './components/home';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import SecurePage from './components/securepage';

const middlewares = [ReduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="securepage" component={SecurePage} />

      </Route>
    </Router>
  </Provider>
  ,document.getElementById('app')
);

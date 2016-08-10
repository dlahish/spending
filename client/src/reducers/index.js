import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import dataReducer from './data_reducer';
import dataYear from './data_year';
import postsBySubreddit from './postsBySubreddit'
import selectedSubreddit from './selectedSubreddit'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
  dataYear: dataYear,
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;

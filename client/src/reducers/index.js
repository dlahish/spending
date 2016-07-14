import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import dataReducer from './data_reducer';
import dataYear from './data_year';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
  dataYear: dataYear
});

export default rootReducer;

import {
  FETCH_DATA,
  UNAUTH_USER
} from '../actions/types';
import moment from 'moment';

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload;
    case UNAUTH_USER:
      return state = [];
    default:
      return state;
  }
};

export default data;

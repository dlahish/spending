import {
  FETCH_DATA,
  UNAUTH_USER,
  TOGGLE_DATA
} from '../actions/types';
import moment from 'moment';

const data = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      const nextState = [];
      action.payload.map(dt => {
        nextState.push({
          data: dt,
          selected: false
        });
      });
      return nextState;
    case TOGGLE_DATA:
      const nextData = state;
        nextData.map(dt => {
          if (dt.data._id === action.payload) {
            if (dt.selected == true) {
                dt.selected = false;
            } else {
                dt.selected = true;
            }
          }
        });
      return nextData;
    case UNAUTH_USER:
      return [];
    default:
      return state;
  }
};

export default data;

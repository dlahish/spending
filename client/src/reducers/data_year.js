import {
  FETCH_MONTHS_TOTAL
} from '../actions/types';
import moment from 'moment';

const initialState =
  {
   2016: []
  };

const dataYear = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONTHS_TOTAL:
      return { ...state, 2016: action.payload };
    default:
      return state;
  }
};

export default dataYear;

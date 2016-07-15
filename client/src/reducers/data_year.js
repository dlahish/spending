import {
  FETCH_MONTHS_TOTAL
} from '../actions/types';
import moment from 'moment';

const initialState = [
  {
   year: null,
   monthsTotal: []
  }
];

const dataYear = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONTHS_TOTAL:
      return { ...state, monthsTotal: action.payload };
    default:
      return state;
  }
};

export default dataYear;

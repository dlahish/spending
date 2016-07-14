import {

} from '../actions/types';
import moment from 'moment';

const initialState = [
  {
   year: null,
   monthsIncomeTotal: [],
   monthsExpensesTotal: []
  }
];

const dataYear = (state = initialState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default dataYear;

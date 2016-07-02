import {
  FETCH_MESSAGE,
  GET_DATA,
  GET_TOTAL
} from '../actions/types';

const initialState = {
  message: '',
  data: {},
  totalIncome: 0,
  totalExpense: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case GET_DATA:
      return Object.assign({}, state, { data: action.payload })
    case GET_TOTAL:
      return { ...state, totalIncome: action.payload.totalIncome, totalExpense: action.payload.totalExpense };
  }

  return state;
}

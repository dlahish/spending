import {
  FETCH_MESSAGE,
  GET_DATA,
  GET_TOTAL,
  SET_VISIBILITY_FILTER,
  UPLOAD_FILE,
  DATE_FORMAT_TOGGLE,
  SEARCH_TOTAL
} from '../actions/types';

const initialState = {
  message: '',
  totalIncome: 0,
  totalExpense: 0,
  visibilityFilter: 'SHOW_ALL',
  uploadFileMessage: '',
  dateFormat: 'eu',
  searchTotalIncome: 0,
  searchTotalExpenses: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case GET_TOTAL:
      return { ...state, totalIncome: action.payload.totalIncome, totalExpense: action.payload.totalExpense };
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.payload };
    case UPLOAD_FILE:
      return { ...state, uploadFileMessage: action.payload };
    case DATE_FORMAT_TOGGLE:
      if (state.dateFormat === 'eu') {
          return { ...state, dateFormat: 'us' };
      } else {
          return { ...state, dateFormat: 'eu' };
      }
    case SEARCH_TOTAL:
      return {
        ...state,
        searchTotalIncome: action.payload.searchTotalIncome,
        searchTotalExpenses: action.payload.searchTotalExpenses
      }
    default:
      return state;
  }
}

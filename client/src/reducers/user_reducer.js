import {
  FETCH_MESSAGE,
  GET_DATA,
  GET_TOTAL,
  SET_VISIBILITY_FILTER,
  UPLOAD_FILE
} from '../actions/types';

const initialState = {
  message: '',
  totalIncome: 0,
  totalExpense: 0,
  visibilityFilter: 'SHOW_ALL',
  uploadFileMessage: ''
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
  }

  return state;
}

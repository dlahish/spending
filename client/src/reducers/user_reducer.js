import { FETCH_MESSAGE, GET_DATA } from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case GET_DATA:
      return { ...state, data: action.payload };
  }

  return state;
}

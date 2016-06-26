import { FETCH_MESSAGE, GET_DATA } from '../actions/types';

const initialState = {
  message: '',
  data: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case GET_DATA:
      return Object.assign({}, state, { data: action.payload })
  }

  return state;
}

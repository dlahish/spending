import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GET_EMAIL,
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error:'', authenticated: true, userEmail: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case GET_EMAIL:
      return { ...state, userEmail: action.payload };
  }

  return state;
}

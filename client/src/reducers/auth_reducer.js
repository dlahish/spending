import {
  AUTH_USER,
  AUTH_ERROR,
  AUTH_ERROR_EMAIL,
  AUTH_ERROR_PASSWORD,
  UNAUTH_USER,
  GET_EMAIL,
  CLEAR_ERROR,
  ADD_ROUTE,
  REMOVE_ROUTE
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, userEmail: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case AUTH_ERROR_EMAIL:
      return { ...state, emailError: action.payload };
    case AUTH_ERROR_PASSWORD:
      return { ...state, passwordError: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case GET_EMAIL:
      return { ...state, userEmail: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: '', emailError: '', passwordError: '' };
    case ADD_ROUTE:
      return { ...state, currentRoute: action.payload };
    case REMOVE_ROUTE:
      return { ...state, currentRoute: '' };
  }

  return state;
}

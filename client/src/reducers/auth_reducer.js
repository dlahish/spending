import {
  AUTH_USER,
  AUTH_ERROR,
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
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case GET_EMAIL:
      return { ...state, userEmail: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case ADD_ROUTE:
      return { ...state, currentRoute: action.payload };
    case REMOVE_ROUTE:
      return { ...state, currentRoute: '' };
  }

  return state;
}

import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_ERROR_EMAIL,
  AUTH_ERROR_PASSWORD,
  CLEAR_ERROR,
  FETCH_MESSAGE,
  GET_EMAIL,
  GET_DATA,
  ADD_ROUTE,
  GET_TOTAL
}
from './types';

const ROOT_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: email
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/securepage');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
          if (response.data.token) {
            dispatch({
              type: AUTH_USER,
              payload: email
            });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/securepage');
          }

          else if (response.data.message) {
            if (response.data.message !== 'Invalid password') {
              dispatch(authErrorEmail(response.data.message));
            } else if (response.data.message === 'Invalid password') {
              dispatch(authErrorPassword(response.data.message));
            }

            dispatch(addRouteToStore('/signinattempt'));
            browserHistory.push('/signinattempt');
          }
      })
      .catch((err) => {
        dispatch(authError('Something went wrong'));
        dispatch(addRouteToStore('/signinattempt'));
        browserHistory.push('/signinattempt');
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, { headers: { authorization: localStorage.getItem('token') }})
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
      .catch((err) => {
        dispatch(authError('Unable to get data'));
      });
  }
}

export function getUserEmail() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/getemail`, { headers: { authorization: localStorage.getItem('token') }})
      .then(response => {
        dispatch({
          type: GET_EMAIL,
          payload: response.data.email
        });
      })
      .catch((err) => {
        dispatch(authError('Something went wrong'));
      });
  }
}

export function getUserData() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/getdata`, { headers: { authorization: localStorage.getItem('token') }})
      .then(response => {
        response.data.data.map((td) => {
          dispatch({
            type: GET_DATA,
            payload: td
          });
        });
      })
      .catch((err) => {
        dispatch(authError('Something went wrong with GET_DATA'));
      });
  }
}

export function getTotal() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/gettotal`, { headers: { authorization: localStorage.getItem('token') }})
      .then(response => {
        dispatch({
          type: GET_TOTAL,
          payload: {
            totalIncome: response.data.income,
            totalExpense: response.data.expense
          }
        });
      })
      .catch((err) => {
        dispatch(authError('Something went wrong with GET_DATA'));
      });
  }
}

export function addRouteToStore(route) {
  return {
    type: ADD_ROUTE,
    payload: route
  };
}

export function removeRouteFromStore() {
  return {
    type: REMOVE_ROUTE
  };
}

export function clearAuthError() {
  return { type: CLEAR_ERROR };
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

function authErrorEmail(error) {
  return {
    type: AUTH_ERROR_EMAIL,
    payload: error
  };
}

function authErrorPassword(error) {
  return {
    type: AUTH_ERROR_PASSWORD,
    payload: error
  };
}

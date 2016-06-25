import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  GET_EMAIL
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
        dispatch({
          type: AUTH_USER,
          payload: email
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/securepage');
      })
      .catch((err) => {
        dispatch(authError('Bad Login Info'));
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

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

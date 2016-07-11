import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment';
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
  FETCH_DATA,
  ADD_ROUTE,
  GET_TOTAL,
  SET_VISIBILITY_FILTER,
  UPLOAD_FILE,
  DATE_FORMAT_TOGGLE
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
        browserHistory.push('/dashboard');
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
            browserHistory.push('/dashboard');
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

export function uploadFile(url, data, email, dateFormat) {
  return function(dispatch) {
    let formData  = new FormData();
    formData.append('file', data.file[0]);
    formData.append('email', email);
    formData.append('dateformat', dateFormat);
    axios({
      url: url,
      method: 'post',
      data: formData,
      contentType: 'multipart/form-data',
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log('response ------');
      console.log(response);
      if (response.data.message) {
        dispatch({
          type: UPLOAD_FILE,
          payload: response.data.message
        })
      }
    })
    .catch(err => {
      dispatch(authError('Something went wrong with uploading the file'));
      browserHistory.push('/');
    });
  };
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

export function getUserData(dataLength) {
  return function(dispatch) {
    let dataToReducer = [];
    axios.get(`${ROOT_URL}/getdata`, { headers: { authorization: localStorage.getItem('token') }})
      .then(response => {
        if (response.data.data.length !== dataLength) {
          response.data.data.map((td) => {
            console.log('DATA TO FETCH ----');
            let parsedDate = moment(td.date).format("DD/MM/YYYY");
            console.log(td.date);
            console.log(parsedDate);
            console.log('AND BACK -------');
            let andBack = moment("26/06/2016", "DD/MM/YYYY");
            console.log(andBack);
            td.date = parsedDate;
            dataToReducer.push(td);
          });
          dispatch({
            type: FETCH_DATA,
            payload: dataToReducer
          });
        }
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

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: filter
  }
}

export function toggleDateFormat() {
  return { type: DATE_FORMAT_TOGGLE };
}

export function clearAuthError() {
  return { type: CLEAR_ERROR };
}

export function clearUploadFileMessage() {
  return {
    type: UPLOAD_FILE,
    payload: ''
  };
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

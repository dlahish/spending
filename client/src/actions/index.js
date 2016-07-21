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
  DATE_FORMAT_TOGGLE,
  SEARCH_TOTAL,
  FETCH_MONTHS_TOTAL,
  ADD_CATEGORY,
  FETCH_CATEGORIES,
  DELETE_CATEGORY,
  TOGGLE_CATEGORY,
  ADD_NEW_RECORD,
  TOGGLE_DATA,
  CALL_API
}
from './types';

const ROOT_URL = 'http://localhost:3090';

export function wafApi() {
  console.log('WAFFFFF');
  return function(dispatch) {
      // Create the XHR object.
  // function createCORSRequest(method, url) {
  //   var xhr = new XMLHttpRequest();
  //   if ("withCredentials" in xhr) {
  //     // XHR for Chrome/Firefox/Opera/Safari.
  //     xhr.open(method, url, true);
  //   } else if (typeof XDomainRequest != "undefined") {
  //     // XDomainRequest for IE.
  //     xhr = new XDomainRequest();
  //     xhr.open(method, url);
  //   } else {
  //     // CORS not supported.
  //     xhr = null;
  //   }
  //   return xhr;
  // }
  //
  // // Helper method to parse the title tag from the response.
  // function getTitle(text) {
  //   return text.match('<title>(.*)?</title>')[1];
  // }
  //
  // // Make the actual CORS request.
  // function makeCorsRequest() {
  //   // All HTML5 Rocks properties support CORS.
  //   var url = 'http://updates.html5rocks.com';
  //
  //   var xhr = createCORSRequest('GET', url);
  //   if (!xhr) {
  //     alert('CORS not supported');
  //     return;
  //   }
  //
  //   xhr.withCredentials = true;
  //
  //   // Response handlers.
  //   xhr.onload = function() {
  //     var text = xhr.responseText;
  //     var title = getTitle(text);
  //     alert('Response from CORS request to ' + url + ': ' + title);
  //   };
  //
  //   xhr.onerror = function() {
  //     alert('Woops, there was an error making the request.');
  //   };
  //
  //   xhr.send();
  // }
  //
  // makeCorsRequest();
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios({
      url: 'https://api.weforum.org/v1/topics/global-financial-system/articles',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/json'
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err =>{
      console.log(err);
    });
  }
}

export function deleteRecord(url, data) {
  return function(dispatch) {
    console.log('deleteRecord action creator');
    let idToDelete = null;
    let dataToReducer = [];
    let serachTotalIncome = 0;
    let searchTotalExpenses = 0;
    data.map(dt => {
      if (dt.selected == true) {
        console.log(dt);
        idToDelete = dt.data._id;
      };
    });

    let dataToServer = {
      idToDelete: idToDelete
    };
    console.log(url, idToDelete);
    axios({
      url: url,
      method: 'post',
      data: dataToServer,
      contentType: 'application/json',
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log('record was deleted');
      response.data.data.map((td) => {
        let parsedDate = moment(td.date).format("DD/MM/YYYY");
        td.date = parsedDate;
        dataToReducer.push(td);
        getUserDataByRange
      });
      dispatch({
        type: FETCH_DATA,
        payload: dataToReducer
      });
      dispatch({
        type: SEARCH_TOTAL,
        payload: {
          searchTotalIncome: response.data.searchTotalIncome,
          searchTotalExpenses: response.data.searchTotalExpenses
        }
      })
    })
    .catch(err =>{
      console.log(err);
    });
  }
}

export function addNewRecord(url, data, date, category) {
  return function(dispatch) {
    data = {
      date: date,
      category: category,
      amount: data.amount,
      notes: data.notes
    };

    axios({
      url: url,
      method: 'post',
      data: data,
      contentType: 'application/json',
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      browserHistory.push('/dashboard');
    })
    .catch(err =>{
      console.log(err);
    });
  }
}

export function toggleData(dataId) {
  return {
    type: TOGGLE_DATA,
    payload: dataId
  };
}

export function toggleCategory(category) {
  return {
    type: TOGGLE_CATEGORY,
    payload: category
  };
}

export function deleteCategory(category) {
  return function(dispatch) {
    axios({
      url: `${ROOT_URL}/deletecategory`,
      method: 'post',
      headers: { authorization: localStorage.getItem('token') },
      contentType: 'application/json',
      data: { category: category }
    })
    .then(response => {

    })
    .catch(err => {
      console.log(err);
      dispatch(authError('Something went wrong with DELETE_CATEGORY'));
    })
  }
}

export function addNewCategory(newCategory) {
  return function(dispatch) {
    axios({
      url: `${ROOT_URL}/addnewcategory`,
      method: 'post',
      headers: { authorization: localStorage.getItem('token') },
      contentType: 'application/json',
      data: { category: newCategory }
    })
    .then(response => {
      dispatch({
        type: ADD_CATEGORY,
        payload: newCategory
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(authError('Something went wrong with ADD_CATEGORIES'));
    })
  }
}

export function fetchCategories() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/fetchcategories`, { headers: { authorization: localStorage.getItem('token') }})
      .then(response => {
        const categoriesToReducer = [];
        response.data.categories.map(category => {
          categoriesToReducer.push({
            name: category,
            selected: false
          });
        });
        dispatch({
          type: FETCH_CATEGORIES,
          payload: categoriesToReducer
        })
      })
      .catch((err) => {
        dispatch(authError('Unable to get categories'));
      });
  }
}

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
        dispatch(authError('Something went wrong with sign in user'));
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

export function getMonthsTotal(year) {
  return function(dispatch) {
    axios({
      url: `${ROOT_URL}/getmonthstotal`,
      method: 'post',
      headers: { authorization: localStorage.getItem('token') },
      contentType: 'application/json',
      data: { year }
    })
    .then(response => {
      dispatch({
        type: FETCH_MONTHS_TOTAL,
        payload: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(authError('Something went wrong with getMonthsTotal'));
    });
  }
}

export function getUserDataByRange(dataLength, startDate, endDate) {
  return function(dispatch) {
    let dataToReducer = [];
    let serachTotalIncome = 0;
    let searchTotalExpenses = 0;
    axios({
      url: `${ROOT_URL}/getdata`,
      method: 'post',
      data: { startDate: startDate, endDate: endDate },
      headers: { authorization: localStorage.getItem('token') },
      contentType: 'application/json'
    })
    .then(response => {
        response.data.data.map((td) => {
          let parsedDate = moment(td.date).format("DD/MM/YYYY");
          // console.log(td.date);
          // console.log(parsedDate);
          // console.log('AND BACK -------');
          let andBack = moment("26/06/2016", "DD/MM/YYYY");
          // console.log(andBack);
          td.date = parsedDate;
          dataToReducer.push(td);
          getUserDataByRange
        });
        dispatch({
          type: FETCH_DATA,
          payload: dataToReducer
        });
        dispatch({
          type: SEARCH_TOTAL,
          payload: {
            searchTotalIncome: response.data.searchTotalIncome,
            searchTotalExpenses: response.data.searchTotalExpenses
          }
        })
    })
    .catch((err) => {
      dispatch(authError('Something went wrong with getUserDataByRange'));
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

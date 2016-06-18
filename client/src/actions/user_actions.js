import axios from 'axios';
import { FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

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

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_MESSAGE } from './types';
//import { fetch } from 'whatwg-fetch';


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

export function uploadFile(input) {
  // const input = document.querySelector('input[type="file"]')
  var data = new FormData()
  data.append('file', input.file[0])
  data.append('user', 'hubot')

  fetch(`${ROOT_URL}/upload`, {
    method: 'POST',
    body: data
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
}

export function uploadImage(imageFile) {
  return function(dispatch) {
    // return new Promise((resolve, reject) => {
      let imageFormData = new FormData();

      imageFormData.append('imageFile', imageFile);

      console.log('uploadImage ------');

      axios({
        url: 'http://localhost:3090/upload',
        method: 'post',
        data: {
          imageFormData
        }
      }).
      then((res) => {
        console.log('response from server');
        console.log(res);
      })
      .catch((err) => { console.log(err)} );
      // var xhr = new XMLHttpRequest();
      //
      // xhr.open('post', 'http://localhost:3090/upload', true);
      //
      // xhr.onload = function () {
      //   if (this.status == 200) {
      //     then(this.response);
      //   } else {
      //     then(this.statusText);
      //   }
      // };
      //
      // xhr.send(imageFormData);

    // });
  }
}
  // Object.keys(data).forEach(( key ) => {
  //   console.log('Hello from uploadFile action criator ----');
  //   console.log(key);
  //   body.append(key, data[ key ]);
  // });



  // fetch(`${ROOT_URL}/upload`, {
  //     method: 'POST',
  //     body: body,
  //   })
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));
  // }
  // var data = new FormData();
  // data.append('file', file[0]);
  // console.log('DATADATADATA');
  // console.log(body);


  // return function(dispatch) {
  //   axios.post(`${ROOT_URL}/upload`, body )
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
// }

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

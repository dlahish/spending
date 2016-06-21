export default function httpPostForm(url, data) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json'
    },
    body: data,
  })
  // .then(checkStatus)
  // .then(parseJSON);
}

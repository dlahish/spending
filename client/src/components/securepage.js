import React from 'react';

export default () => (
  <div>
    <h1>This a secure page</h1>
    <h3>Your token is:</h3>
    {localStorage.getItem('token')}
  </div>
);

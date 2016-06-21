import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/user_actions';
var Dropzone = require('react-dropzone');
import axios from 'axios';

class UploadFile extends Component {

  handleSubmit(data) {
    console.log('handleSubmit ------');
    console.log('data ------');
    console.log(data);
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      body.append(key, data[ key ]);
      console.log('body ------');
      console.log(body);
    });

    // fetch(`http://localhost:3090/upload`, {
    //   method: 'POST',
    //   body: body,
    // })

    axios.post('http://localhost:3090/upload', body)
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleFile(fieldName, event) {
    event.preventDefault();
    const { fields } = this.props;
    // convert files to an array
    const files = [ ...event.target.files ];
    fields[fieldName].onChange(files);
  }


  render() {
    const { handleSubmit, submitting, resetForm, fields: {files} } = this.props;

    return (
      <form>
        <input { ...files } value={null} type='file' onChange={this.handleFile.bind(this, 'image')} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'uploadfile',
  fields: ['files',]
}, null, actions)(UploadFile)

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class ContactForm extends Component {
  _handleSubmit(formProps){
    console.log('formProps');
    console.log(formProps.file);
    console.log('spreadsheet');
    sendData('http://localhost:3090/upload', formProps);
    //let file = replacer(formProps, formProps.files);
    //console.log(file);
    // var body = new FormData();
    //
    // body.append('file', file);
    //
    // console.log(body.file);


    // fetch(`http://example.com/send/`, {
    //   method: 'POST',
    //   body: body,
    // })
  }

  render() {
    const {fields: {firstName, lastName, email, spreadsheet}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this._handleSubmit.bind(this))}>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <div>
          <label>File</label>
          <input type="file" placeholder="File" {...spreadsheet} value={null} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function sendData(url, data) {
  var formData  = new FormData();

  formData.append('spreadsheet', data.spreadsheet[0]);
  // for(name in data) {
  //   console.log(name);
  //   formData.append(name, data[name]);
  // }
  console.log('sendData -----');
  console.log(formData.entries());
  fetch(url, {
    method: 'POST',
    body: formData,
    contentType: 'multipart/form-data'
  });
}

function replacer(key, value) {
  if (value instanceof FileList) {
    console.log('=======');
    return Array.from(value).map(file => file.name).join(', ') || 'No Files Selected';
  }
  console.log('nonono');
  return value;
}

function stringify(values) {
  return JSON.stringify(values, replacer, 2);
}

ContactForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['firstName', 'lastName', 'email', 'spreadsheet'] // all the fields in your form
})(ContactForm);

export default ContactForm;

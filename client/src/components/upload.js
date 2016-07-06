import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions'
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


class UploadForm extends Component {

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
  }

  _handleSubmit(formProps) {
    console.log('formProps');
    console.log(formProps.file);
    console.log('spreadsheet');
    sendData('http://localhost:3090/upload', formProps, this.props.userEmail);
  }

  render() {
    const {fields: {firstName, lastName, email, file}, handleSubmit} = this.props;
    console.log('this.props.userEmail');
    console.log(this.props.userEmail);
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
           <p>{file.touched && file.error ? file.error : ''}</p>
         </div>
        <div>
          <RaisedButton label="Choose an Image" labelPosition="before" primary={true}>
            <input {...file} accept={'text/csv'} type="file" style={styles.exampleImageInput} value={null} />
          </RaisedButton>
          {/*<input type="file" {...file} value={null} />*/}
        </div>
        <div>
        <RaisedButton
          label="Submit"
          type="submit"
          style={styles.exampleImageInput}
        />
        </div>


        {/*<button type="submit">Submit</button>*/}
      </form>
    );
  }
}

function validate(values) {
  let errors = {};
  console.log('values ------');
  console.log(values);
  if (!values.file) {
      errors.file = 'Required';
  } else {
      let file = values.file[0];
      console.log(file.type);
      console.log(file.name.endsWith('.CSV'));
      console.log(file.name.endsWith('.csv'));
      if (file.type !== 'text/csv') {
          errors.file = 'Scan file must be an .CSV file';
      }
  }

  return errors;
}

function sendData(url, data, email) {
  console.log('sendData -------');
  var formData  = new FormData();

  formData.append('file', data.file[0]);
  formData.append('email', email);

  console.log('sendData -----');
  console.log(formData.entries());
  fetch(url, {
    method: 'POST',
    body: formData,
    contentType: 'multipart/form-data'
  });
}

function mapStateToProps(state) {
  return { userEmail: state.auth.userEmail };
}

UploadForm = reduxForm({
  form: 'contact',
  fields: ['firstName', 'lastName', 'email', 'file'],
  validate
}, mapStateToProps, actions)(UploadForm);

export default UploadForm;

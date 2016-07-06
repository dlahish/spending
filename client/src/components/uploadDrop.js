import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions'
import Dropzone from 'react-dropzone';

class UploadForm extends Component {

  onDrop(file) {
    console.log('onDROP -----');
    console.log(file)
    sendData('http://localhost:3090/upload', file, this.props.userEmail);
  }

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

  // static propTypes = {
  //   fields: PropTypes.object.isRequired,
  //   handleSubmit: PropTypes.func.isRequired,
  //   resetForm: PropTypes.func.isRequired,
  //   submitting: PropTypes.bool.isRequired,
  // };

  // handleSubmit(data) {
  //   // var body = new FormData();
  //   // Object.keys(data).forEach(( key ) => {
  //   //   body.append(key, data[ key ]);
  //   // });
  //
  //   var formData  = new FormData();
  //
  //   formData.append('file', data.files[0]);
  //   formData.append('email', this.props.userEmail);
  //
  //   fetch(`http://localhost:3090/upload`, {
  //     method: 'POST',
  //     body: body,
  //     contentType: 'multipart/form-data'
  //   })
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));
  // }

  render() {
    const {
      fields: { files, },
      handleSubmit,
      resetForm,
      submitting,
    } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <div>
          <label>Files</label>
          <div>
            <Dropzone
              { ...files }
              onDrop={ this.onDrop.bind(this) }
              multiple={false}
              accept={'text/csv'}
              style={{ backgroundColor: 'grey ', bordeStyle: 'dashed', width: '50%', margin: 'auto' }}
            >
              <div style={{ margin: 'auto', height: '130px' }}>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        </div>
        <div>
          <button
            disabled={ submitting }
            onClick={ handleSubmit(this._handleSubmit.bind(this)) }
          >
            { submitting ? <i/> : <i/> } Submit
          </button>
          <button
            disabled={ submitting }
            onClick={ resetForm }
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

function validate(values) {
  let errors = {};
  // console.log('values ------');
  // console.log(values);
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

  formData.append('file', data.files);
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
  form: 'upload',
  fields: ['files',],
  validate
}, mapStateToProps, actions)(UploadForm);

export default UploadForm;

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },

  paper : {
    margin: 'auto',
    textAlign: 'center',
    marginTop: '30px',
    width: '40%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 25,
    paddingBottom: '40px'
  },

  label: {
    fontWeight: 'bold',
    fontSize: 30,
  },

  divBlock: {
    marginTop: 20,
    marginLeft: 120,
    maxWidth: 250
  },

  toggle: {
    marginBottom: 16
  }
};


class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      toggled: false
    };
  }

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    if (this.props.dateFormat === "eu") {
        this.setState({
          toggled: false
        });
    } else {
        this.setState({
          toggled: true
        });
    }
  }

  handleFileChange(ev) {
    // console.log('HANDLECHANGE');
    // const r = e.get(value);
    // console.log(ev[0].name);
    this.setState({
      fileName: ev[0].name
    });
    // console.log(this.props);
    // console.log(file.value[0].name);
    // console.log(formProps.file[0].name + 'aaaa');
  }

  _handleSubmit(formProps) {
    this.setState({
      fileName: ''
    });
    this.props.uploadFile('http://localhost:3090/upload', formProps, this.props.userEmail, this.props.dateFormat);
    // sendData('http://localhost:3090/upload', formProps, this.props.userEmail);
  }

  handleToggle() {
    if (this.props.dateFormat === "eu") {
        this.setState({
          toggled: true
        });
    } else {
        this.setState({
          toggled: false
        });
    }
    this.props.toggleDateFormat();
  }

  render() {
    const {fields: {firstName, lastName, email, file}, handleSubmit} = this.props;
    console.log(this.state.toggled);
    console.log(this.props.dateFormat);
    return (
      <Paper style={styles.paper} zDephth={3} >
        <form onSubmit={handleSubmit(this._handleSubmit.bind(this))}>
          <div>
            <p>{file.touched && file.error ? file.error : ''}</p>
            {this.props.uploadFileMessage === 'All data already exists' ?
              <div>
                <p>All data already exists</p>
              </div> : this.props.uploadFileMessage ?
              <div style={{ color: 'red' }}>
                <p>{this.props.uploadFileMessage}</p>
              </div> : ''}
            {this.state.fileName.length > 0 ?
              <div style={{ marginBottom: '40px' }}>
              {/*<TextField hintText="First name" style={style} underlineShow={false} />*/}
                <h3>File chosen:</h3>
                <p>{this.state.fileName}</p>
                <Divider />
              </div> : ''}
          </div>
          <div style={{ margin: 'auto' }}>
            <RaisedButton label="Select a file" labelPosition="before" primary={true}>
              <input {...file}
                accept={'text/csv'}
                type="file"
                value={null}
                style={styles.exampleImageInput}
                onChange={
                  ( e ) => {
                    e.preventDefault();
                    const { fields } = this.props;
                    // convert files to an array
                    const files = [ ...e.target.files ];
                    this.handleFileChange(files);
                  }
                }
              />
            </RaisedButton>
            <RaisedButton
              label="Upload"
              type="submit"
              style={{ marginLeft: '10px' }}
            />
          </div>
          <div style={styles.divBlock}>
            <Toggle
              label="American date format"
              style={styles.toggle}
              onToggle={this.handleToggle.bind(this)}
              toggled={this.state.toggled}
            />
          </div>
        </form>
      </Paper>
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
      // console.log(file.type);
      // console.log(file.name.endsWith('.CSV'));
      // console.log(file.name.endsWith('.csv'));
      if (file.type !== 'text/csv') {
          errors.file = 'Scan file must be an .CSV file';
      }
  }

  return errors;
}

// function sendData(url, data, email) {
//   var formData  = new FormData();
//   formData.append('file', data.file[0]);
//   formData.append('email', email);
//   fetch(url, {
//     method: 'POST',
//     body: formData,
//     contentType: 'multipart/form-data'
//   });
// }

function mapStateToProps(state) {
  return {
    userEmail: state.auth.userEmail,
    uploadFileMessage: state.user.uploadFileMessage,
    dateFormat: state.user.dateFormat
  };
}

UploadForm = reduxForm({
  form: 'contact',
  fields: ['firstName', 'lastName', 'email', 'file'],
  validate
}, mapStateToProps, actions)(UploadForm);

export default UploadForm;

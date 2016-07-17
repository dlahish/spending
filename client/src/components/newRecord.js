import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';
import * as actions from '../actions';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  paper : {
    margin: 50,
    textAlign: 'left',
    marginTop: 10,
    margin: 'auto',
    width: '40%',
    backgroundColor: 'white',
    padding: 20
  },

  label: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 15
  },

  headline: {
    fontSize: 24,
    paddingTop: 10,
    marginBottom: 8,
    fontWeight: 400,
  },

  slide: {
    padding: 10,
  },

  customWidth: {
    width: 150,
  }
};

const selectItems = [
  <MenuItem key={1} value={1} primaryText="Never" />,
  <MenuItem key={2} value={2} primaryText="Every Night" />,
  <MenuItem key={3} value={3} primaryText="Weeknights" />,
  <MenuItem key={4} value={4} primaryText="Weekends" />,
  <MenuItem key={5} value={5} primaryText="Weekly" />,
];

class NewRecord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      selectValue: null,
      slideIndex: 0
    }
  }

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
  }

  handleSelectChange = (event, index, value) => this.setState({ selectValue: value });

  handleSlideChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleFormSubmit(formProps) {
    console.log('Form Submit');
  }

  handleDateChange = (event, date) => {
    this.setState({ date: date });
  }

  handleDateFormat(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  render() {
    const { handleSubmit, fields: {date, amount, category}} = this.props;

    return (
      <div>
        <p style={styles.label}>Enter a New Record</p>
        <Paper style={styles.paper} zDephth={3} >
        <Tabs
          value={this.state.value}
          onChange={this.handleSlideChange}
        >
          <Tab label="Income" value={0} />
          <Tab label="Expense" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlideChange}
        >
          <div>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div>
                <DatePicker
                  hintText="Choose date"
                  onChange={this.handleDateChange.bind(this)}
                  value={this.state.date}
                  formatDate={this.handleDateFormat.bind(this)}
                  style={{ display: 'inline-block', paddingTop: '20px', color: 'black' }}
                  autoOk={true}
                  mode={'landscape'}
                  dialogContainerStyle={{ cursor: 'pointer', color: 'black' }}
                  textFieldStyle={{ cursor: 'pointer', color: 'black' }}
                  hintStyle={{ color: 'black' }}
                  floatingLabelText="Date:"
                  floatingLabelStyle={{ color: 'black' }}
                  //{...date}
                />
              </div><br />
              <div>
                <TextField
                  floatingLabelText="Amount:"
                  floatingLabelStyle={{ color: 'black' }}
                  name='Amount'
                  style={{ display: 'inline-block'}}
                  errorText = { amount.touched && amount.error }
                  {...amount}
                />
              </div><br />
              <div>
                <SelectField
                  //style={{ marginTop: '-25px' }}
                  value={this.state.selectValue}
                  onChange={this.handleSelectChange.bind(this)}
                  floatingLabelText="Category"
                  hintText="Category"
                  floatingLabelStyle={{ color: 'black' }}
                >
                  {selectItems}
                </SelectField>
              </div>

              <RaisedButton
                primary={true}
                style={{ marginTop: 10 }}
                label="Sign Up"
                type="submit"
                //onTouchTap={ () => { this.handleSigninButton.bind(this) }}
              />

            </form>
          </div>
          <div>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div style={{ margin: 'auto'}}>
                <DatePicker
                  hintText="Choose date"
                  onChange={this.handleDateChange.bind(this)}
                  value={this.state.date}
                  formatDate={this.handleDateFormat.bind(this)}
                  style={{ display: 'inline-block', marginLeft: '15px' }}
                  autoOk={true}
                  mode={'landscape'}
                  {...date}
                />
              </div><br />
              <div>
                <TextField
                  floatingLabelText="Amount:"
                  floatingLabelStyle={{ color: 'black' }}
                  name='Amout'
                  style={{ display: 'inline-block', marginLeft: '15px' }}
                  errorText = { amount.touched && amount.error }
                  {...amount}
                />
              </div><br />
              <div>
                <SelectField
                  value={this.state.selectValue}
                  onChange={this.handleSelectChange}
                >
                  <MenuItem value={1} primaryText="Never" />
                  <MenuItem value={2} primaryText="Every Night" />
                  <MenuItem value={3} primaryText="Weeknights" />
                  <MenuItem value={4} primaryText="Weekends" />
                  <MenuItem value={5} primaryText="Weekly" />
                </SelectField>
              </div>

              <RaisedButton
                primary={true}
                style={{ marginTop: 10 }}
                label="Sign Up"
                type="submit"
                //onTouchTap={ () => { this.handleSigninButton.bind(this) }}
              />

            </form>
          </div>
        </SwipeableViews>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const validate = formProps => {
  const errors = {};

  if (!formProps.amount) {
      errors.amount = 'Please enter an amount';
  }

  if (formProps.amount) {
    let firstDigit = formProps.amount.toString()[0];
    if (firstDigit === '0') {
        errors.amount = 'Amount can not start with zero';
    }
  }

  return errors;
}

export default reduxForm({
  form: 'newrecord',
  fields: ['date', 'amount', 'category'],
  validate
}, mapStateToProps, actions)(NewRecord);

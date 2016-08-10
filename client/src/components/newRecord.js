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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
  },

  radioButton: {
    marginBottom: 12
  }
};

class NewRecord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      selectedCategory: null
    }
  }

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.fetchCategories();
  }

  handleSelectChange = (event, index, value) => this.setState({ selectedCategory: value });

  handleSlideChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleFormSubmit(formProps) {
    console.log('Form Submit');
    if (formProps.reqType === 'Expense') {
      formProps.amount = formProps.amount * -1;
    }
    const categorytoServer = this.props.categories[this.state.selectedCategory].name;
    this.props.addNewRecord('http://localhost:3090/addrecord', formProps, this.state.date, categorytoServer);
  }

  handleDateChange = (event, date) => {
    this.setState({ date: date });
  }

  handleDateFormat(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  render() {
    const { handleSubmit, fields: { date, amount, category, reqType, notes }} = this.props;

    return (
      <div>
        <p style={styles.label}>Enter a New Record</p>
        <Paper style={styles.paper} zDephth={3} >
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div style={{ marginBottom: '-30px', paddingTop: '15px' }}>
                <RadioButtonGroup
                  name="reqType"
                  //defaultSelected="Income"
                  style={{ display: 'flex', width: '40%' }}
                  {...reqType}
                >
                  <RadioButton
                    value="Income"
                    label="Income"
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="Expense"
                    label="Expense"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
              </div>
              <div>
                <DatePicker
                  hintText="Choose date"
                  onChange={this.handleDateChange.bind(this)}
                  value={this.state.date}
                  formatDate={this.handleDateFormat.bind(this)}
                  style={{ paddingTop: '20px', color: 'black' }}
                  autoOk={true}
                  mode={'landscape'}
                  dialogContainerStyle={{ cursor: 'pointer', color: 'black' }}
                  hintStyle={{ color: 'black' }}
                  floatingLabelText="Date:"
                  floatingLabelStyle={{ color: 'black' }}
                  //{...date}
                />
              </div><br />
              <div style={{ marginTop: '-15px' }}>
                <TextField
                  floatingLabelText="Amount:"
                  floatingLabelStyle={{ color: 'black' }}
                  name='Amount'
                  errorText = { amount.touched && amount.error }
                  {...amount}
                />
              </div><br />
              <div style={{ marginTop: '-10px' }}>
                <SelectField
                  //style={{ marginTop: '-25px' }}
                  value={this.state.selectedCategory}
                  onChange={this.handleSelectChange.bind(this)}
                  floatingLabelText="Category"
                  hintText="Category"
                  floatingLabelStyle={{ color: 'black' }}
                >
                  {this.props.categories.map((category, i) => <MenuItem key={i} value={i} primaryText={category.name} />) }
                </SelectField>
              </div>
              <div style={{ paddingTop: '20px' }}>
              <TextField
                value='Note:'
                underlineShow={false}
              />
                <textarea
                  rows="2"
                  cols="50"
                  {...notes}
                ></textarea>
              </div>

              <RaisedButton
                primary={true}
                style={{ marginTop: '20px' }}
                label="Submit"
                type="submit"
                //onTouchTap={ () => { this.handleSubmitButton.bind(this) }}
              />
            </form>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    categories: state.user.categories
  };
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
  fields: ['date', 'amount', 'category', 'reqType', 'notes'],
  validate
}, mapStateToProps, actions)(NewRecord);

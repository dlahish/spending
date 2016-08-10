import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterLink from './FilterLink';
import Table from './Table';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import { cyan500, red700, amber500, grey50, blueGrey500, teal600 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import { FormattedNumber } from 'react-intl'

const getVisibleData = (
  data,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return data;
    case 'SHOW_INCOME':
      return data.filter(d => d.data.amount > 0);
    case 'SHOW_EXPENSE':
      return data.filter(d => d.data.amount < 0);
    case 'SORT_UP_AMOUNT':
      return data.sort((a,b) => a.data.amount - b.data.amount);
    case 'SORT_DOWN_AMOUNT':
      return data.sort((a,b) => b.data.amount - a.data.amount);
    case 'SORT_UP_DATE':
      return data.sort((a,b) => {
        const aDate = moment(a.data.date, "DD/MM/YYYY");
        const bDate = moment(b.data.date, "DD/MM/YYYY");
        return aDate - bDate;
      });
    case 'SORT_DOWN_DATE':
      return data.sort((a,b) => {
        const aDate = moment(a.data.date, "DD/MM/YYYY");
        const bDate = moment(b.data.date, "DD/MM/YYYY");
        return bDate - aDate;
      });
    case 'SORT_UP_CATEGORY':
      return data.sort((a,b) => a.data.category.charAt(0).toUpperCase() > b.data.category.charAt(0).toUpperCase());
    case 'SORT_DOWN_CATEGORY':
      return data.sort((a,b) => b.data.category.charAt(0).toUpperCase() > a.data.category.charAt(0).toUpperCase());
    default:
      return data;
  }
};

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      dateError: '',
      endDateDisabled: true,
      selectedDataId: null,
      selectedMonth: null
    }
  }

  componentWillMount() {
    console.log('componentWillMount -------');
    if (!this.props.email) {
      this.props.getUserEmail();
    }
    let thisMonth = moment().month();
    if (thisMonth === 12) {
        let thisYear = moment().year();
        let nextYear = nextYear + 1;
        const startMonth = moment('01/'+thisMonth+'/'+thisYear, "DD/M/YYYY");
        const endMonth = moment(startMonth).endOf('month');
        this.props.getUserDataByRange(null, startMonth, endMonth);
    } else {
        const nextMonth = thisMonth + 1;
        let thisYear = moment().year();
        const startMonth = moment('01/'+thisMonth+'/'+thisYear, "DD/M/YYYY");
        const endMonth = moment(startMonth).endOf('month');
        this.props.getUserDataByRange(null, startMonth, endMonth);
    }
  }

  handleStartDateChange = (event, date) => {
    if (date > this.state.endDate && this.state.endDate !== null) {
        this.setState({ dateError: 'Start date must be before end date.', startDate: null, dateReady: false });
    } else {
        this.setState({ startDate: date, endDateDisabled: false, dateError: '' });
        if (this.state.startDate && this.state.endDate !== null && this.state.dateError.length === 0) {
          this.props.getUserDataByRange(this.props.data.length, this.state.startDate, this.state.endDate);
        }
    }
  }

  handleEndDateChange = (event, date) => {
    if (date < this.state.startDate) {
        this.setState({ dateError: 'End date must be after start date.', dateReady: false })
    } else {
        this.setState({ endDate: date, dateError: '' });
        if (this.state.startDate && this.state.endDate && this.state.dateError.length === 0) {
          this.props.getUserDataByRange(this.props.data.length, this.state.startDate, this.state.endDate);
        }
    }
  }

  handleDateFormat(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  openStartDatePicker(){
    this.refs.startDate.openDialog()
  }

  openEndDatePicker(){
    this.refs.endDate.openDialog()
  }

  handleShowExpenses(){
    this.props.setVisibilityFilter('SHOW_EXPENSE')
  }

  handleShowIncome(){
    this.props.setVisibilityFilter('SHOW_INCOME')
  }

  handleShowAll(){
    this.props.setVisibilityFilter('SHOW_ALL')
  }

  handleDeleteButton() {
    this.props.deleteRecord('http://localhost:3090/deleterecord', this.props.data);
  }

  handleSelectChange = (event, index, value) => {
    this.setState({ selectedMonth: value });
    let thisMonth = value + 1;
    if (thisMonth === 12) {
        let thisYear = moment().year();
        let nextYear = nextYear + 1;
        const startMonth = moment('01/'+thisMonth+'/'+thisYear, "DD/M/YYYY");
        const endMonth = moment(startMonth).endOf('month');
        this.props.getUserDataByRange(null, startMonth, endMonth);
    } else {
        const nextMonth = thisMonth + 1;
        let thisYear = moment().year();
        const startMonth = moment('01/'+thisMonth+'/'+thisYear, "DD/M/YYYY");
        const endMonth = moment(startMonth).endOf('month');
        this.props.getUserDataByRange(null, startMonth, endMonth);
    }
  }

  handleYearButton() {
    const thisYear = moment().year();
    const start = moment('01/01/'+thisYear, "DD/M/YYYY");
    const end = moment('31/12/'+thisYear, "DD/M/YYYY");
    this.props.getUserDataByRange(null, start, end);
  }

  render() {
    const visibleData = getVisibleData(this.props.data, this.props.visibilityFilter);
    let thisYear = moment().year();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      <div
        style={{
          textAlign: 'center',
          width: '90%',
          margin: 'auto',
          marginTop: '-24px',
          background: grey50 }}>
        <div style={{ background: blueGrey500, color: 'black', paddingBottom: '20px', paddingTop: '20px' }}>
          <h2>Date Rage To Display</h2>
          <div>
            {(this.state.dateError.length > 0) ? <div style={{ color: 'red' }}>{this.state.dateError}</div> : '' }
            <br/>
            <div style={{ display: 'inline-block', textAlign: 'center', marginRight: '40px' }}>
              <RaisedButton
                onTouchTap={this.openStartDatePicker.bind(this)}
                label='Start Date'
              /><br />
              <DatePicker
                ref='startDate'
                textFieldStyle={{ paddingLeft: '18px', width: '100px' }}
                onChange={this.handleStartDateChange.bind(this)}
                value={this.state.startDate}
                formatDate={this.handleDateFormat.bind(this)}
                autoOk={true}
                underlineShow={false}
              />
            </div>
            <div style={{ display: 'inline-block', textAlign: 'center' }}>
              <RaisedButton
                onTouchTap={this.openEndDatePicker.bind(this)}
                label='End Date'
                disabled={this.state.endDateDisabled}
              /><br />
              <DatePicker
                ref='endDate'
                textFieldStyle={{ paddingLeft: '18px', width: '100px' }}
                onChange={this.handleEndDateChange.bind(this)}
                value={this.state.endDate}
                formatDate={this.handleDateFormat.bind(this)}
                autoOk={true}
                disabled={this.state.endDateDisabled}
                underlineShow={false}
              />
            </div>
          </div>
          <div
          style={{
            background: teal600,
            width: '50%',
            margin: 'auto',
            // paddingTop: '5px',
            // paddingBottom: '5px',
            padding: '5px',
            color: 'black',
            border: '1px solid black',
            borderRadius: '5px'
           }}>
            <div style={{ display: 'inline', marginRight: '80px' }}>
              <h3 style={{ display: 'inline', marginRight: '10px' }}>Search Income: </h3>{''}
              <FormattedNumber value={this.props.searchTotalIncome} style='currency' currency='SCH' currencyDisplay='name'/>
            </div>
            <div style={{ display: 'inline' }}>
              <h3 style={{ display: 'inline', marginRight: '10px' }}>Search Expense: </h3>{''}
              <FormattedNumber value={this.props.searchTotalExpenses} style='currency' currency='SCH' currencyDisplay='name'/>
            </div>
          </div>
          <div>
            <h4 style={{ display: 'inline' }}>Show:</h4>
            <RaisedButton
              label='All'
              style={{ marginLeft: '10px' }}
              onTouchTap={ this.handleShowAll.bind(this) }
            />
            <RaisedButton
              label='Income'
              style={{ marginLeft: '10px' }}
              onTouchTap={ this.handleShowIncome.bind(this) }
            />
            <RaisedButton
              label='Expenses'
              style={{ marginLeft: '10px' }}
              onTouchTap={ this.handleShowExpenses.bind(this) }
            />
            <SelectField
              style={{
                width: '200px',
                // backgroundColor: 'red',
                marginLeft: '40px',
                marginTop: '55px',
                marginBottom: '-20px'
              }}
              underlineStyle={{borderColor: 'black' }}
              hintText="Select Month to Display"
              hintStyle={{ color: 'black' }}
              autoWidth={true}
              value={this.state.selectedMonth}
              onChange={this.handleSelectChange.bind(this)}
            >
              {months.map((month, i) => <MenuItem key={i} value={i} primaryText={month} />) }
            </SelectField>
            <RaisedButton
              label={thisYear}
              style={{ marginLeft: '20px' }}
              //backgroundColor={red700}
              onTouchTap={ this.handleYearButton.bind(this) }
            />
            <RaisedButton
              label='Delete transaction'
              style={{ marginLeft: '20px' }}
              backgroundColor={red700}
              onTouchTap={ this.handleDeleteButton.bind(this) }
            />
          </div>
        </div>

        <Table tableData={visibleData} dataSelectedId={this.state.dataSelectedId}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.user.message,
    email: state.auth.userEmail,
    data: state.data,
    totalIncome: state.user.totalIncome,
    totalExpense: state.user.totalExpense,
    searchTotalIncome: state.user.searchTotalIncome,
    searchTotalExpenses: state.user.searchTotalExpenses,
    visibilityFilter: state.user.visibilityFilter,
    months2016: state.dataYear[2016]
  };
}

export default connect(mapStateToProps, actions)(Data);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterLink from './FilterLink';
import Table from './Table';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import PieChart from './pie';
// import Chart from './chart';
import DatePicker from 'material-ui/DatePicker';
import { cyan500 } from 'material-ui/styles/colors';

const getVisibleData = (
  data,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return data;
    case 'SHOW_INCOME':
      return data.filter(d => d.amount > 0);
    case 'SHOW_EXPENSE':
      return data.filter(d => d.amount < 0);
    case 'SORT_UP_AMOUNT':
      return data.sort((a,b) => a.amount - b.amount);
    case 'SORT_DOWN_AMOUNT':
      return data.sort((a,b) => b.amount - a.amount);
    case 'SORT_UP_DATE':
      return data.sort((a,b) => {
        const aDate = moment(a.date, "DD/MM/YYYY");
        const bDate = moment(b.date, "DD/MM/YYYY");
        return aDate - bDate;
      });
    case 'SORT_DOWN_DATE':
      return data.sort((a,b) => {
        const aDate = moment(a.date, "DD/MM/YYYY");
        const bDate = moment(b.date, "DD/MM/YYYY");
        return bDate - aDate;
      });
    case 'SORT_UP_CATEGORY':
      return data.sort((a,b) => a.category > b.category);
    case 'SORT_DOWN_CATEGORY':
      return data.sort((a,b) => a.category < b.category);
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
      dataSelectedId: null
    }
  }

  componentWillMount() {
    console.log('DAHBOARD component will mount ----');
    // console.log(this.props.data);
    if (!this.props.email) {
      this.props.getUserEmail();
    }
    this.props.getTotal();
    this.props.getMonthsTotal(2016);
    this.props.data.map(dt => {
      if (dt.selected === true) {
        console.log('MATCH ----');
        this.setState({ dataSelectedId: dt.data._id });
      }
    });
  }

  handleStartDateChange = (event, date) => {
    console.log('handle start date change');
    if (date > this.state.endDate && this.state.endDate !== null) {
        this.setState({ dateError: 'Start date must be before end date.', startDate: null, dateReady: false });
    } else {
        this.setState({ startDate: date, endDateDisabled: false, dateError: '' });
        if (this.state.startDate && this.state.endDate !== null && this.state.dateError.length === 0) {
          // this.setState({ dateReady: true });
          this.props.getUserData(this.props.data.length, this.state.startDate, this.state.endDate);
        }
    }
  }

  handleEndDateChange = (event, date) => {
    if (date < this.state.startDate) {
        this.setState({ dateError: 'End date must be after start date.', dateReady: false })
    } else {
        this.setState({ endDate: date, dateError: '' });
        if (this.state.startDate && this.state.endDate && this.state.dateError.length === 0) {
          // this.setState({ dateReady: true });
          this.props.getUserData(this.props.data.length, this.state.startDate, this.state.endDate);
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



  render() {
    const visibleData = getVisibleData(this.props.data, this.props.visibilityFilter);
    console.log('RENDER DATA ----');
    console.log(this.state.selectedDataId);
    return (
      <div style={{ textAlign: 'center', width: '80%', margin: 'auto', paddingTop: '20px' }}>
        <h2>Select date range to show record data</h2>
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
        <div>
          <p  style={{ display: 'inline-block', marginRight: '20px' }}>
            Search Income: {''} {this.props.searchTotalIncome}
          </p>
          <p  style={{ display: 'inline-block' }}>
            Search Expense: {''} {this.props.searchTotalExpenses}
          </p>
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
        </div>
        {/*<p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_All'
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_INCOME'
          >
            Income
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_EXPENSE'>
            Expense
          </FilterLink>
        </p>*/}

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

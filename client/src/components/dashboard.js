import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterLink from './FilterLink';
import Table from './Table';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import PieChart from './pie';
import Chart from './chartTheme';
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      dateError: '',
      endDateDisabled: true
    }
  }

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.getTotal();
    this.props.getMonthsTotal(2016);

  }

  handleStartDateChange = (event, date) => {
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

  render() {
    const visibleData = getVisibleData(this.props.data, this.props.visibilityFilter);

    return (
      <div style={{ textAlign: 'left' }}>
        <div>
          <PieChart income={this.props.totalIncome} expenses={this.props.totalExpense}/>
          {(this.state.dateError.length > 0) ? <div style={{ color: 'red' }}>{this.state.dateError}</div> : '' }
          <Chart data={this.props.monthsTotal}/>
        </div>
        <h4 style={{ display: 'inline-block' }}>Start date: </h4>
        <DatePicker
          hintText="Choose date"
          onChange={this.handleStartDateChange.bind(this)}
          value={this.state.startDate}
          formatDate={this.handleDateFormat.bind(this)}
          style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }}
          autoOk={true}
        />
        <h4 style={{ display: 'inline-block' }}>End date: </h4>
        <DatePicker
          hintText="Choose date"
          onChange={this.handleEndDateChange.bind(this)}
          value={this.state.endDate}
          formatDate={this.handleDateFormat.bind(this)}
          style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }}
          autoOk={true}
          disabled={this.state.endDateDisabled}
        />
        <div>
          <p  style={{ display: 'inline-block', marginRight: '20px' }}>
            Total Income: {''} {this.props.totalIncome}
          </p>
          <p  style={{ display: 'inline-block' }}>
            Total Expense: {''} {this.props.totalExpense}
          </p>
        </div>
        <div>
          <p  style={{ display: 'inline-block', marginRight: '20px' }}>
            Search Income: {''} {this.props.searchTotalIncome}
          </p>
          <p  style={{ display: 'inline-block' }}>
            Search Expense: {''} {this.props.searchTotalExpenses}
          </p>
        </div>
        <p>
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
          {' '}
          <FilterLink
            filter='SORT_UP_AMOUNT'>
            Amount increasing
          </FilterLink>
          {' '}
          <FilterLink
            filter='SORT_DOWN_AMOUNT'>
            Amount decreasing
          </FilterLink>
        </p>

        <Table tableData={visibleData}/>
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
    monthsTotal: state.dataYear.monthsTotal
  };
}

export default connect(mapStateToProps, actions)(Dashboard);

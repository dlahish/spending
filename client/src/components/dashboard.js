import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterLink from './FilterLink';
import Table from './Table';
import TextField from 'material-ui/TextField';
import moment from 'moment';

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
    default:
      return data;
  }
};

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.getTotal();
    this.props.getUserData(this.props.data.length);
  }

  render() {
    const visibleData = getVisibleData(this.props.data, this.props.visibilityFilter);
    console.log(this.props.data.date);

    return (
      <div style={{ textAlign: 'left' }}>
        <div>
          <p>
            Total Income: {''} {this.props.totalIncome}
          </p>
          <p>
            Total Expense: {''} {this.props.totalExpense}
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
    visibilityFilter: state.user.visibilityFilter
  };
}

export default connect(mapStateToProps, actions)(Dashboard);

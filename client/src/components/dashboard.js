import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterLink from './FilterLink';
import Table from './Table';
import TextField from 'material-ui/TextField';

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
    default:
      return data;
  }
};

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.getUserData(this.props.data.length);
    this.props.getTotal();
  }

  render() {
    const visibleData = getVisibleData(this.props.data, this.props.visibilityFilter);

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

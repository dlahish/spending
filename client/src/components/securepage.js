import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterLink from './FilterLink';

const getVisibleData = (
  data,
  filter
) => {
  switch (filter) {
    case 'ALL':
      return data;
    case 'SHOW_INCOME':
      return data.filter(d => d.amount > 0);
    case 'SHOW_EXPENSE':
      return data.filter(d => d.amount < 0);
    default:
      return data;
  }
};

class SecurePage extends Component {
  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.fetchMessage();
    if (this.props.data.length < 1) {
      this.props.getUserData();
    }
    this.props.getTotal();
  }

  render() {
    const visibleData = getVisibleData(this.props.data, this.props.visibilityFilter);

    return (
      <div style={{ textAlign: 'left' }}>
        <p>
          Show:
          {' '}
          <FilterLink
            filter='All'
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
            Exspense
          </FilterLink>
        </p>
        <ul>
          {visibleData.map(dat =>
            <li key={dat._id}>
              <ul>
                <li>{dat.fileName}</li>
                <li>{dat.date}</li>
                <li>{dat.amount}</li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.user.message,
    email: state.auth.userEmail,
    data: state.dataFromServer,
    totalIncome: state.user.totalIncome,
    totalExpense: state.user.totalExpense,
    visibilityFilter: state.user.visibilityFilter
  };
}

export default connect(mapStateToProps, actions)(SecurePage);

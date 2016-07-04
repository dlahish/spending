import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FilterLink extends Component {
  render() {
    if (this.props.filter === this.props.visibilityFilter) {
      return <span>{this.props.children}</span>
    }

    return (
      <a href='#'
        onClick={e => {
          this.props.setVisibilityFilter(this.props.filter);
        }}
      >
        {this.props.children}
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
    visibilityFilter: state.user.visibilityFilter
  };
}

export default connect(mapStateToProps, actions)(FilterLink);

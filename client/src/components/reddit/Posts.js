import React, { Component, PropTypes } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, i) =>
          <li key={i}>{item.title}</li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  items: PropTypes.array.isRequired
}

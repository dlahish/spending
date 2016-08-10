import React, { Component, PropTypes } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, i) =>
          <li key={i}>
            <div style={{ maxWidth: '80%', textAlign: 'left' }}>
              <p style={{ fontWeight: 'bold' }}>{item.title}</p>
              <p>{item.selftext}</p>
            </div>
          </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  items: PropTypes.array.isRequired
}

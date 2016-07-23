import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from './reddit/Picker'
import Posts from './reddit/Posts'

class Reddit extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, items, isFetching, lastUpdate } = this.props
    console.log('RENDER posts --');
    console.log(items);
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend', 'israel' ]}
        />
        <p>
          {lastUpdate &&
            <span>
              Last updated at {new Date(lastUpdate).toLocalTimeString()}.
              {' '}
            </span>
          }
          {isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && items.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.length === 0 &&
          <h2>Empty.</h2>
        }
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts items={items} />
          </div>
        }
      </div>
    )
  }
}

Reddit.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdate: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit } = state
  const postsBySubreddit = state.user[selectedSubreddit] || {};
  console.log('MAP STATE TO PROPS postsBySubreddit --');
  console.log(postsBySubreddit.items);
  let items = []
  let isFetching = true
  let lastUpdate = null
  if (postsBySubreddit.items === undefined) {
    console.log('undefined');
    isFetching = true
    items = []
  } else {
    isFetching = postsBySubreddit.isFetching
    lastUpdate = postsBySubreddit.lastUpdate
    items = postsBySubreddit.items
  }

  console.log(items);
  return {
    selectedSubreddit,
    items,
    isFetching,
    lastUpdate
  }
}

export default connect(mapStateToProps)(Reddit)

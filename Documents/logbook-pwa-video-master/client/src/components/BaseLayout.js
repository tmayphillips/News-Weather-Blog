import React, {Component} from 'react'

class BaseLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: 'assistance'
    }
  }

  selectChannel = channel => {
    this.setState({channel})
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default BaseLayout

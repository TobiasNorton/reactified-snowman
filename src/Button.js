import React, { Component } from 'react'

class Button extends Component {
  _click = event => {
    this.props.letterClick(this.props.value)
  }

  render() {
    return (
      <button onClick={this._click} disabled={this.props.disabled} value={this.props.value}>
        {this.props.value}
      </button>
    )
  }
}

export default Button

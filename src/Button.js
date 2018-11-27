import React, { Component } from 'react'

class Button extends Component {
  _click = event => {
    console.log('clicked')
    console.log(event.target.value)
    this.props.letterClick(this.props.value)
  }

  render() {
    return (
      <button
        // key={this.props.key}
        onClick={this._click}
        disabled={this.props.disabled}
        value={this.props.value}
      >
        {this.props.value}
      </button>
    )
  }
}

export default Button

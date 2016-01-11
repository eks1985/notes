import React from 'react';
import {PropTypes} from 'react';

var ControlledInput = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  _change: function (e) {
    this.setState({value: e.target.value},
      this.props.setTitle(e.target.value));
  },

  render: function() {
    return (
      <div>
        <input style={{minWidth: 50}} type="text" value={this.state.value} onChange={this._change} />
      </div>
    );
  }

});

export default ControlledInput

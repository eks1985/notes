import React from 'react';
import {PropTypes} from 'react';

import TextField from 'material-ui/lib/text-field';

var ControlledTextField = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  onChange: function (e) {
    this.props.setNewItemTitle(e.target.value);
    this.setState({value: e.target.value});
  },

  render: function() {
    return (
      <div>
        <TextField value={this.state.value} onChange={this.onChange} fullWidth={true} />
      </div>
    );
  }

});

export default ControlledTextField

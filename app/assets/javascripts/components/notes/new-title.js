import React from 'react';
import {PropTypes} from 'react';

import TextField from 'material-ui/lib/text-field';

var NewTitle = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.title
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({value: nextProps.title});
  },

  _titleChange: function (e) {
    this.props.setNewTitle(e.target.value)
    this.setState({value: e.target.value});
  },

  render: function() {
    return (
      <div>
        <TextField floatingLabelText="New title" value={this.state.value} onChange={this._titleChange}/>
      </div>
    );
  }

});

export default NewTitle

import React from 'react';
import {PropTypes} from 'react';

var ControllerArea = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.v
    };
  },

  _onChange: function (e) {
    this.setState({
      value: e.target.value
    });
  },

  render: function() {
    return (
      <textarea id="edit_area" value={this.state.value} onChange={this._onChange} style={{"width": "100%", "maxWidth": "100%", "minHeight": "40vh", "fontSize": 12}}></textarea>
    );
  }

});

export default ControllerArea

import React from 'react';
import {PropTypes} from 'react';

import IconButton from 'material-ui/lib/icon-button';

var AddCardItem = React.createClass({

  getInitialState: function() {
    return {
      dialogOpen: false
    };
  },

  contextTypes: {
    openDialog: PropTypes.func
  },

  _add: function (e) {
    this.context.openDialog("");
  },

  render: function() {
    var containerStyle = {
      display: "flex",
      justifyContent: "center"
    }
    var addStyle = {
    }
    return (
      <div style={containerStyle}>
        <IconButton iconClassName="mui-icon-uniF278" style={addStyle} iconStyle={{"fontSize": 20}} onFocus={this._add}/>
      </div>
    );
  }

});

export default AddCardItem 

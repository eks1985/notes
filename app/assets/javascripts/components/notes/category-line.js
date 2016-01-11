import React from 'react';
import {PropTypes} from 'react';

import ListItem from 'material-ui/lib/lists/list-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';

var CategoryLine = React.createClass({

  _clickDelete: function (e) {
    var title = $(e.target).attr("data-title");
    this.props.deleted(title);
    e.stopPropagation();
  },

  render: function() {
    var style = {}
    var label =
    <div data-title={this.props.title} style={{color: "gray", top: "2px", right: "40px", fontSize: 12}} onClick={this._clickDelete}>delete</div>
    return (
      <div>
        <ListItem primaryText={this.props.title} onTouchTap={this._select} rightIcon={label} style={style}></ListItem>
      </div>
    );
  }

});

export default CategoryLine

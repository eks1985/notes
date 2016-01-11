import React from 'react';
import {PropTypes} from 'react';

import Card from './card';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';

var Notebook = React.createClass({

  render: function() {
    var self = this;
    var containerStyle = {
      display: "flex",
      flexWrap: "wrap",
      padding: 10
    }
    var categories_keys = [];
    if (this.props.notebook.ch !== null) {
      categories_keys = Object.keys(this.props.notebook.ch);
    }
    var items = categories_keys.map(function (item_key, i) {
      return (
        <Card key={item_key} itemKey={item_key} category={self.props.notebook.ch[item_key]} />
      )
    });

    return (
      <div style={containerStyle}>
        {items}
      </div>
    );
  }

});

export default Notebook

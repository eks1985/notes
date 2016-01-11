import React from 'react';
import Paper from 'material-ui/lib/paper';
import NewComp from './new_comp';
import CustomIcon from './custom_icon';

import Main from './notes/main';

var PropTypes = React.PropTypes;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Main notebook_struct={this.props.notebook_struct}/> 
      </div>
    );
  }
});

module.exports = App;

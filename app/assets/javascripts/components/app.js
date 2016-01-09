import React from 'react';
import Paper from 'material-ui/lib/paper';
import NewComp from './new_comp';
import CustomIcon from './custom_icon';

var PropTypes = React.PropTypes;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Paper style={{padding: 20}}>
          <NewComp qty={15} />
          <CustomIcon />
        </Paper>
      </div>
    );
  }
});

module.exports = App;

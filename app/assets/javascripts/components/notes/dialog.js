import React from 'react';
import {PropTypes} from 'react';

import Dialog from 'material-ui/lib/dialog';
import ControlledTextField from './controlled-text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

var CustomDialog = React.createClass({

  getDefaultProps: function() {
    return {
      branchTitle: ""
    };
  },

  contextTypes: {
    addItem: PropTypes.func
  },

  propTypes: {
    branchTitle: PropTypes.string
  },

  getInitialState: function() {
    return {
      open: this.props.open,
      newItemTitle: ""
    };
  },

  _close: function () {
    this.setState({open: false});
  },

  _save: function () {
    this.context.addItem(this.state.newItemTitle, this.props.branchTitle);
  },

  setNewItemTitle: function (newTitle) {
    this.setState({newItemTitle: newTitle});
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.open == true) {
      this.setState({open: true});
    }
  },

  handleClose: function () {
    this.setState({open: false});
  },

  render: function() {
    return (
      <div>
        <Dialog
          title="New card title"
          open={this.state.open}
          >
          <ControlledTextField value="" setNewItemTitle={this.setNewItemTitle}/>
          <br></br>
          <br></br>
          <RaisedButton label="Save" onTouchTap={this._save} style={{marginRight: 10}}/>
          <FlatButton label="Close" onTouchTap={this._close}/>
        </Dialog>
      </div>
    );
  }

});

export default CustomDialog

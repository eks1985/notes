import React from 'react';
import {PropTypes} from 'react';

import FlatButton from 'material-ui/lib/flat-button';

import Notebooks from './notebooks'; 

var NotebookMain = React.createClass({
  getInitialState: function() {
    // console.log(this.props.notebook_struct);
    return {
      struct: JSON.parse(this.props.notebook_struct),
      current_notebook_title: ""
    };
  },
  _refresh: function () {
    $.ajax({
      context: this,
      url: "/contents",
      dataType: "json",
      success: function( response ) {
        this.setState({struct: response});
      },
    });
  },
  render: function() {
    return (
      <div  style={{padding: 30, position: "relative"}}>
        <Notebooks struct={this.state.struct} render={true} refresh={this._refresh}/>
      </div>
    );
  }

});

export default NotebookMain

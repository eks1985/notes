import React from 'react';
import {PropTypes} from 'react';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import BranchMenu from './branch-menu';

var Branch = React.createClass({

  getDefaultProps: function() {
    return {
      collapse: true,
      text: ""
    };
  },

  getInitialState: function() {
    return {
      collapse: this.props.collapse
    };
  },

  contextTypes: {
    editMode: PropTypes.bool,
    categoryTitle: PropTypes.string,
    notebookTitle: PropTypes.string
  },

  _titleClick: function (e) {
    e.stopPropagation();
    if (this.state.collapse == true) {
      this.setState({collapse: false});
    } else {
      this.setState({collapse: true});
    }
  },

  _add: function (e) {
  },

  _expand: function () {
    this.setState({collapse: false});
  },

  _collapse: function () {
    this.setState({collapse: true});
  },

  _open: function (e) {
    var topicsStr = this.props.topics == undefined ? "[]" : JSON.stringify(this.props.topics);
    $("#topics"+this.props.text.replace(/ /g,"")).val(topicsStr);
    $("#ref_topics"+this.props.text.replace(/ /g,"")).submit();
  },

  render: function() {
    var el_children;
    var style = {
      paddingLeft: (this.props.level+1)*8
    }
    var branchTitleStyle = {
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }
    if (this.state.collapse == true) {
      el_children = null;
    } else {
      el_children = this.props.children
    }
    var iconButtonStyle = {
      padding: 0,
      width: "24px",
      height: "24px"
    }
    var groupIconStyle = {
      "fontSize": 18,
    }
    var addIconStyle = {
      "fontSize": 16,
    }
    var titleStyle = {}
    if (this.props.ch !== null) {
      titleStyle.cursor = "pointer";
      titleStyle.color = "blue";
    } else {
      groupIconStyle.color = "white";
    }
    var edit_icon;
    if (this.context.editMode) {
      edit_icon =
      <BranchMenu branchTitle={this.props.text} />
    }
    var expand, collapse;
    if (this.state.collapse) {
      var expand =
      <div>
        <IconButton iconClassName="mui-icon-uniF2FB" style={iconButtonStyle} iconStyle={groupIconStyle} onFocus={this._expand}/>
      </div>
    } else {
      var collapse =
      <div>
        <IconButton iconClassName="mui-icon-uniF2FC" style={iconButtonStyle} iconStyle={groupIconStyle} onFocus={this._collapse}/>
      </div>
    }
    var open;
    if (this.props.topics !== undefined) {
      open =
      <div>
        <IconButton iconClassName="mui-icon-uniF1A3" style={iconButtonStyle} iconStyle={{fontSize: 14}} onTouchTap={this._open}/>
      </div>
    }
    return (
      <div data-level={this.props.level}>
        <div style={branchTitleStyle} >
          <div style={{display: "flex", alignItems: "center"}}>
            {expand}
            {collapse}
            <span onClick={this._titleClick} style={titleStyle}>
              {this.props.text}
            </span>
            {edit_icon}
            {open}
          </div>
          <div style={style}>
            {el_children}
          </div>
        </div>
        <form id={"ref_topics"+this.props.text.replace(/ /g,"")} action="/topics" target="_blank">
          <input id={"topics"+this.props.text.replace(/ /g,"")} name="topics" type="hidden" />
          <input name="branchName" type="hidden" value={this.props.text} />
          <input name="categoryTitle" type="hidden" value={this.context.categoryTitle} />
          <input name="notebookTitle" type="hidden" value={this.context.notebookTitle} />
        </form>
      </div>
    );
  }

});

export default Branch

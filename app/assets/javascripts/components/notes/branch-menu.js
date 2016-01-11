import React from 'react';
import {PropTypes} from 'react';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dialog from './dialog';

var BranchMenu = React.createClass({

  propTypes: {
    branchTitle: PropTypes.string
  },

  contextTypes: {
    openDialog: PropTypes.func,
    findNode: PropTypes.func,
    categoryTitle: PropTypes.string,
    notebookTitle: PropTypes.string,
    removeBranch: PropTypes.func
  },

  _selectItem: function (event, value) {
    if (value.props.action == "addChild") {
      this.context.openDialog(this.props.branchTitle);
    } else if (value.props.action  == "addTopic") {
      console.log("add topic");
      var node = this.context.findNode(this.props.branchTitle);
      var topicsStr = node.topics == undefined ? "[]" : JSON.stringify(node.topics);
      $("#topics"+this.props.branchTitle.replace(/ /g,"")).val(topicsStr);
      $("#ref_topics"+this.props.branchTitle.replace(/ /g,"")).submit();
    } else if (value.props.action  == "remove") {
      this.context.removeBranch(this.props.branchTitle, this.context.categoryTitle, this.context.notebookTitle);
    }
  },

  render: function() {
    var iconButtonStyle = {
      padding: 0,
      width: "24px",
      height: "24px"
    };
    var iconButtonElement =
    <IconButton iconClassName="mui-icon-uniF158"  style={iconButtonStyle} iconStyle={{fontSize: 14}}/>
    return (
      <div>
        <IconMenu
          desktop={true}
          anchorOrigin={{vertical: "top", horizontal: "left"}}
          targetOrigin={{vertical: "top", horizontal: "right"}}
          iconButtonElement={iconButtonElement}
          onItemTouchTap={this._selectItem} >
          <MenuItem primaryText="Add child" action="addChild" />
          <MenuItem primaryText="Add topic" action="addTopic" />
          <MenuItem primaryText="Remove" action="remove"/>
          <MenuItem primaryText="Move top" action="moveTop" />
          <MenuItem primaryText="Move down" action="moveDown" />
        </IconMenu>
        <form id={"ref_topics"+this.props.branchTitle.replace(/ /g,"")} action="/topics" target="_blank">
          <input id={"topics"+this.props.branchTitle.replace(/ /g,"")} name="topics" type="hidden" />
          <input name="branchName" type="hidden" value={this.props.branchTitle} />
          <input name="categoryTitle" type="hidden" value={this.context.categoryTitle} />
          <input name="notebookTitle" type="hidden" value={this.context.notebookTitle} />
        </form>
      </div>
    );
  }

});

export default BranchMenu

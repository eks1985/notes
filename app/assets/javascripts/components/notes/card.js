import React from 'react'
import {PropTypes} from 'react';

import Paper from 'material-ui/lib/paper';
import AddCardItem from './add-card-item';
import CardBody from './card-body';
import IconButton from 'material-ui/lib/icon-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Dialog from './dialog';

var Card = React.createClass({

  getInitialState: function() {
    return {
      editMode: false,
      tree: this.props.category,
      dialogOpen: false,
      branchTitle: ""
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({tree: nextProps.category});
  },

  contextTypes: {
    updateStruct: PropTypes.func
  },

  childContextTypes: {
    editMode: PropTypes.bool,
    tree: PropTypes.object,
    addItem: PropTypes.func,
    openDialog: PropTypes.func,
    branchTitle: PropTypes.string,
    findNode: PropTypes.func,
    categoryTitle: PropTypes.string,
    removeBranch: PropTypes.func
  },

  getChildContext: function () {
    // console.log("Get child context card");
    return {
      editMode: this.state.editMode,
      tree: this.state.tree,
      addItem: this.addItem,
      openDialog: this.openDialog,
      branchTitle: this.state.branchTitle,
      findNode: this.findNode,
      categoryTitle: this.props.itemKey,
      removeBranch: this.removeBranch
    }
  },

  _setEditMode: function () {
    this.setState({editMode: true});
  },

  _removeEditMode: function () {
    this.setState({editMode: false});
  },

  addItem: function (title, branchTitle) {
    var new_state_tree = this.state.tree;
    if (branchTitle == "") {
      parent = new_state_tree.category_records;
      parent.ch.push({descr: title, ch: null, parent: parent.descr})
    } else {
      parent = this.findNode(branchTitle, this.state.tree.category_records);
      if (parent.ch == null) {
        parent.ch = [];
      }
      parent.ch.push({descr: title, ch: null, parent: parent.descr})
    }
    this.setState({tree: new_state_tree, dialogOpen: false},
      this.context.updateStruct(this.props.itemKey, this.state.tree)
    );
  },

  removeBranch: function (branchTitle, categoryTitle, notebookTitle) {
    // console.log("remove branch");
    var new_state_tree = this.state.tree;
    var node = this.findNode(branchTitle, this.state.tree.category_records);
    var parentNode = this.findNode(node.parent, this.state.tree.category_records);
    var ind;
    parentNode.ch.map(function (node, i) {
      if (node.descr == branchTitle) {
        ind = i;
      }
    });
    parentNode.ch.splice(ind,1);
    this.setState({tree: new_state_tree, dialogOpen: false},
      this.context.updateStruct(this.props.itemKey, this.state.tree)
    );
  },

  findNode: function (branchTitle, node) {
    var node = node || this.state.tree.category_records;
    var res_node;
    var self = this;
    if (node.descr == branchTitle) {
      return node;
    }
    if (node.ch !== null) {
      for (var prop of node.ch) {
        res_node = self.findNode(branchTitle, prop);
        if (res_node !== undefined) {
          return res_node;
        }
      }
    }
  },

  openDialog: function (branchTitle) {
    this.setState({branchTitle: branchTitle, dialogOpen: true});
  },

  render: function() {
    var categoryContainerStyle = {
      padding: 15,
      flex: "0 0 33.3%",
      position: "relative",
    };
    var categStyle ={
      padding: 15
    };
    var setEditStyle = {
      position: "absolute",
      top: 0,
      left: 0
    }
    var removeEditStyle = {
      position: "absolute",
      top: 0,
      left: 0
    }
    var el_set_edit_mode, el_remove_edit_mode;
    if (this.state.editMode) {
      el_remove_edit_mode =
      <IconButton iconClassName="mui-icon-uniF26B" style={removeEditStyle} iconStyle={{"fontSize": 20}} onFocus={this._removeEditMode}/>
    } else {
      el_set_edit_mode =
      <IconButton iconClassName="mui-icon-uniF158" style={setEditStyle} iconStyle={{"fontSize": 16}} onFocus={this._setEditMode}/>;
    }
    var el_add;
    if (this.state.editMode) {
      el_add = <AddCardItem />;
    }
    var mainButtonStyle = {
      position: "absolute",
      top: -5,
      right: -5
    }
    var el_main_button =
    <FloatingActionButton iconClassName="mui-icon-uniF158" style={mainButtonStyle} mini={true} />
    var el_dialog;
    if (this.state.dialogOpen) {
      el_dialog =
      <Dialog open={true} branchTitle={this.state.branchTitle}/>
    }
    return (
      <div style={categoryContainerStyle} >
        {el_dialog}
        <Paper style={categStyle}>
          <div style={{"fontWeight": "bold"}}>{this.props.itemKey}</div>
          {el_set_edit_mode}
          {el_remove_edit_mode}
          <hr></hr>
          <CardBody />
          {el_add}
        </Paper>
      </div>
    );
  },

  data: {
    category_records: {
      descr: "category records",
      ch: []
    }
  }



});

export default Card

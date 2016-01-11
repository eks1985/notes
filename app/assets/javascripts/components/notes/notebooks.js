import React from 'react';
import {PropTypes} from 'react';

import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import NotebooksLine from './notebooks-line';
import CategoryLine from './category-line';
import NewTitle from './new-title';
import Notebook from './notebook';
import IconButton from 'material-ui/lib/icon-button';
import Topics from './topics';
import Topic from './topic';
import Test from './test';

var Notebooks = React.createClass({

  propTypes: {
    struct: PropTypes.object
  },

  childContextTypes: {
    updateStruct: PropTypes.func,
    notebookTitle: PropTypes.string
  },

  getChildContext: function () {
    return {
      updateStruct: this.updateStruct,
      notebookTitle: this.state.current_notebook_title
    }
  },

  getInitialState: function() {
    return {
      struct: this.props.struct,
      render: true,
      save: false,
      newNotebookTitle: "",
      newCategoryTitle: "",
      current_notebook_title: "",
      collapsed: false,
      editMode: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({struct: nextProps.struct});
  },

  _setNewNotebookTitle: function (title) {
    this.setState({newNotebookTitle: title, render: false, save: false});
  },

  _setNewCategoryTitle: function (title) {
    // console.log("new category title " + title);
    this.setState({newCategoryTitle: title, render: false, save: false});
  },

  _selected: function (title) {
    this.setState({current_notebook_title: title, render: true, save: false});
  },

  _deletedNotebook: function (title) {
    // console.log(title);
    var new_struct = this.state.struct;
    delete new_struct[title];
    this.setState({struct: new_struct, newNotebookTitle: "", current_notebook_title: "", render: true, save: true});
  },

  _deletedCategory: function (title) {
    var new_struct = this.state.struct;
    delete new_struct[this.state.current_notebook_title].ch[title];
    var keys = Object.keys(new_struct[this.state.current_notebook_title].ch);
    if (keys.length == 0) {
      new_struct[this.state.current_notebook_title].ch = null;
    }
    this.setState({struct: new_struct, newNotebookTitle: "", render: true, save: true});
  },

  _addNotebook: function () {
    if (this.state.newNotebookTitle !== "") {
      var new_struct = this.state.struct;
      new_struct[this.state.newNotebookTitle] = {descr: this.state.newNotebookTitle, ch: null};
      this.setState({struct: new_struct, newNotebookTitle: "", render: true, save: true});
    } else {
      alert("Specify a new notebook title");
    }
  },

  _addCategory: function () {
    if (this.state.newCategoryTitle !== "") {
      var new_struct = this.state.struct;
      if (new_struct[this.state.current_notebook_title].ch == null) {
        new_struct[this.state.current_notebook_title].ch = {};
      }
      new_struct[this.state.current_notebook_title].ch[this.state.newCategoryTitle] = {descr: this.state.newCategoryTitle, category_records: {descr: "category records", ch: []}};
      this.setState({struct: new_struct, newCategoryTitle: "", render: true, save: true});
    } else {
      alert("Specify a new notebook title");
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.render;
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.saveNotebooks();
  },

  componentWillReceiveProps: function(nextProps) {
    // console.log("cwr");
    if (nextProps.render) {
      this.setState({render: true, save: false, struct: nextProps.struct});
    }
  },

  saveNotebooks: function () {
    var url =  "/save_contents";
    $.ajax({
      context: this,
      url: url,
      dataType: "text",
      data: {"struct": JSON.stringify(this.state.struct)},
      success: function( response ) {
        // console.log("struct saved");
      },
    });
  },

  _onNotebooksResizeClick: function () {
    var new_collapsed = this.state.collapsed ? false : true;
    this.setState({collapsed: new_collapsed})
  },

  updateStruct: function (category, tree) {
    var new_struct = this.state.struct;
    new_struct[this.state.current_notebook_title].ch[category] = tree;
    this.setState({struct: new_struct});
  },

  _removeEditMode: function () {
    this.setState({editMode: false});
  },

  _setEditMode: function () {
    this.setState({editMode: true});
  },

  render: function() {


    var self = this;
    var containerStyle = {
      display: "flex"
    }
    var resize_style = {
      "position": "absolute",
      "left": -5,
      "top": -5,
    }
    var struct_keys = Object.keys(this.state.struct);
    var notebooks_items = struct_keys.map(function (item_key, i) {
      return (
        <NotebooksLine key={item_key} title={item_key} currentNotebookTitle={self.state.current_notebook_title} selected={self._selected} deleted={self._deletedNotebook} editMode={self.state.editMode}/>
      )
    });
    var categories_items;
    var categories;
    if (this.state.current_notebook_title !== "") {
      var categories_keys = [];
      if (this.state.struct[this.state.current_notebook_title].ch !== null) {
        categories_keys = Object.keys(this.state.struct[this.state.current_notebook_title].ch);
        var categories_items = categories_keys.map(function (item_key, i) {
          return (
            <CategoryLine key={item_key} title={item_key} deleted={self._deletedCategory}/>
          )
        });
      }
      categories =
      <Paper style={{padding: 20, width: 400}}>
        <p>CATEGORIES</p>
        <List>
          {categories_items}
        </List>
        <NewTitle setNewTitle={this._setNewCategoryTitle} title={this.state.newCategoryTitle}/>
        <RaisedButton label="Add new category" onTouchTap={this._addCategory} />
      </Paper>
    }
    var el_notebook;
    if (this.state.current_notebook_title !== "") {
      var notebook = this.state.struct[this.state.current_notebook_title];
      el_notebook =
      <Notebook notebook={notebook} />
    }
    var el_notebook_ctrl =
    <div>
      <NewTitle setNewTitle={this._setNewNotebookTitle} title={this.state.newNotebookTitle}/>
      <RaisedButton label="Add new notebook" onTouchTap={this._addNotebook} />
    </div>
    var removeEditStyle = {
      position: "absolute",
      left: -12,
      top: -12
    };
    var setEditStyle = {
      position: "absolute",
      left: -12,
      top: -12
    }
    var el_set_edit_mode, el_remove_edit_mode;
    if (this.state.editMode) {
      el_remove_edit_mode =
      <IconButton iconClassName="mui-icon-uniF26B" style={removeEditStyle} iconStyle={{"fontSize": 20}} onFocus={this._removeEditMode}/>
    } else {
      el_set_edit_mode =
      <IconButton iconClassName="mui-icon-uniF158" style={setEditStyle} iconStyle={{"fontSize": 16}} onFocus={this._setEditMode}/>;
    }
    var expand, collapse, content;
    if (this.state.collapsed) {
      notebooks_items = null;
      categories = null;
      el_notebook_ctrl = null;
      expand =
      <IconButton iconClassName="mui-icon-uniF2FB" style={resize_style} iconStyle={{"fontSize": 20}} onFocus={this._onNotebooksResizeClick}/>;
    } else {
      collapse =
      <IconButton iconClassName="mui-icon-uniF2FA"  style={resize_style} iconStyle={{"fontSize": 20}} onFocus={this._onNotebooksResizeClick}/>;
      var content =
      <div>
        <div style={containerStyle}>
          <Paper style={{padding: 20, width: 400, position: "relative"}}>
            {el_set_edit_mode}
            {el_remove_edit_mode}
            <FlatButton label="Refresh" onTouchTap={this.props.refresh} style={{position: "absolute", right: 10, top: 10}} labelStyle={{color: "gray"}}/>
            <p>NOTEBOOKS</p>
            <List>
              {notebooks_items}
            </List>
            {this.state.editMode ? el_notebook_ctrl : undefined}
          </Paper>
          {this.state.editMode ? categories : undefined}
        </div>
      </div>;
    }

    return (
      <div>
        {expand}
        {collapse}
        {content}
        <div>
          {el_notebook}
        </div>
      </div>
    );
  }

});

export default Notebooks

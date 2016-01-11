import React from 'react';
import {PropTypes} from 'react';

import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';

import ControllerArea from './controlled-area';
import ControlledInput from './controlled-input';

var Topic = React.createClass({

  propTypes: {
    title: PropTypes.string,
    content: PropTypes.string
  },

  rawMarkup: function(text) {
    var opt = {
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: true,
      sanitize: true,
      smartLists: true,
      smartypants: true
    }
    var rawMarkup = marked(text.toString(), opt);
    return { __html: rawMarkup };
  },

  getInitialState: function() {
    var s = this.props.content == null ? "" : this.props.content
    return {
      collapsed: true,
      width: 260,
      height: 140,
      edit_mode: false,
      title: this.props.title,
      content: s,
      id: this.props.topicId
    };
  },

  _onResizeClick: function () {
    var w = window.innerWidth - 70;
    if (this.state.collapsed) {
      this.setState({"collapsed": false, "width": w, "height": "100%"});
    } else {
      this.setState({"collapsed": true, "edit_mode": false, "width": 260, "height": 140});
    }
  },

  _onEditClick: function () {
    this.setState({"edit_mode": true});
  },

  _previewTopic: function () {
    var content = $("#edit_area").val();
    this.setState({"content": content, "edit_mode": false});
  },

  _saveTopic: function () {
    var self = this;
    var url =  "/topics/" + this.state.id.toString();
    $.ajax({
      url: url,
      method: "PUT",
      dataType: "json",
      data: {
        "content": $("#edit_area").val(),
        "title": self.state.title
      },
      complete: function( response ) {
        var content = $("#edit_area").val();
        self.setState({"content": content, "edit_mode": false});
      },
    });
  },

  setTitle: function (title) {
    this.setState({title: title});
  },

  render: function() {
    var styles = this.getStyles();
    this.prepareStyles(styles);
    var el_resize1,
        el_resize2,
        el_body,
        el_edit,
        el_id,
        el_edit_area,
        el_edit_save,
        el_edit_preview,
        el_title;
    if (this.state.collapsed == false) {
      el_resize1 =
      <div>
        <IconButton iconClassName="mui-icon-uniF136" style={styles.resize_style} iconStyle={{"fontSize": 20}} onFocus={this._onResizeClick}/>
      </div>
      el_body =
      <div style={{"fontSize": 14}} dangerouslySetInnerHTML={this.rawMarkup(this.state.content)} />
      el_edit =
      <div>
        <IconButton iconClassName="mui-icon-uniF158" style={styles.edit_style} iconStyle={{"fontSize": 18}} onFocus={this._onEditClick}/>
      </div>
    } else {
      el_resize2 =
      <div>
        <IconButton iconClassName="mui-icon-enlarge2" style={styles.resize_style} iconStyle={{"fontSize": 14}} onFocus={this._onResizeClick}/>
      </div>
    }
    el_id =
    <span style={styles.idStyle}>{this.state.id}</span>
    el_title = this.state.edit_mode == true ? <ControlledInput value={this.state.title} setTitle={this.setTitle}/> : this.state.title;
    if (this.state.edit_mode == true) {
        el_edit_area =
        <ControllerArea v={this.state.content}></ControllerArea>
        el_edit_preview =
        <RaisedButton label="Preview" onTouchTap={this._previewTopic}></RaisedButton>;
        el_edit_save =
        <RaisedButton label="Save" onTouchTap={this._saveTopic}></RaisedButton>;
    }

    return (
      <Paper rounded={false} style={styles.paperStyle} ref="current">
        {el_id}
        {el_resize1}
        {el_resize2}
        {el_edit}
        <div ref="current_edit_area">
          <div style={styles.topRightCtrlPanel}>
            {el_edit_preview}
            <div style={styles.spacerStyle}></div>
            {el_edit_save}
          </div>
          <p></p>
          {el_edit_area}
        </div>
        <div ref="current_body" style={styles.bodyStyle}>
          <div style={styles.titleStyle}>
            {el_title}
          </div>
          <br></br>
          <div>
            {el_body}
          </div>
        </div>
      </Paper>
    );
  },

  getStyles: function () {
    return {
      paperStyle: {
          "position": "relative",
          "margin": 5,
          "padding": 20,
          "display": "flex",
          "flexDirection": "column",
          "fontSize": 12,
          "width": this.state.width,
          "height": this.state.height,
          "flexShrink": 0
      },
      resize_style: {
        "position": "absolute",
        "right": 0,
        "top": 0,
      },
      edit_style: {
        "position": "absolute",
        "right": 30,
        "top": 0,
      },
      idStyle: {
        "position": "absolute",
        "left": 3,
        "top": 3,
        "color": "#ccc",
        "fontSize": 10
      },
      titleStyle: {},
      bodyStyle: {
        "paddingTop": 20
      },
      spacerStyle: {
        "padding": 5
      },
      topRightCtrlPanel: {
        "display": "flex"
      }
    }
  },

  prepareStyles: function (styles) {
    if (!this.state.collapsed) {
      styles.titleStyle.fontWeight = "bold";
    }
    if (this.props.width) {
      styles.paperStyle.width = this.props.width
    }
    if (this.props.height) {
      styles.paperStyle.height = this.props.height
    }
  }

});

module.exports = Topic;

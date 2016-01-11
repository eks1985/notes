import React from 'react';
import {PropTypes} from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Topic from './topic';

var Topics = React.createClass({

  propTypes: {
    branchName: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      topicsArray: JSON.parse(this.props.topics_array)
    };
  },

  _createTopic: function () {
    var url =  "topics";
    $.ajax({
      context: this,
      url: url,
      method: "POST",
      dataType: "json",
      success: function( response ) {
        var el_new_topic = {title: response.title, content: response.content, topicId: response.id}
        var new_topics_array = this.state.topicsArray;
        new_topics_array.push(el_new_topic);
        this.setState({topicsArray: new_topics_array},
          this.updateNotebooks()
        );
      },
    });
  },

  updateNotebooks: function () {
    var topics_array_ids = this.state.topicsArray.map(function (elem, i) {
        return elem.topicId;
    });
    var notebooks_struct = JSON.parse(this.props.notebooks_struct);
    var node = this.findNode(this.props.branchName, notebooks_struct[this.props.notebookTitle].ch[this.props.categoryTitle].category_records);
    node.topics = topics_array_ids;
    $.ajax({
      context: this,
      url: "save_contents",
      dataType: "text",
      data: {"struct": JSON.stringify(notebooks_struct)},
      success: function( response ) {
      },
    });
  },

  findNode: function (branchTitle, node) {
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

  render: function() {
    document.title = this.props.title;
    var self = this;
    var topics = this.props.topics;
    var topics_array = this.state.topicsArray;
    var el_topics = topics_array.map(function (elem, i) {
      var content = "";
      $.each(topics, function (i,v) {
          if (v.id == elem.topicId) {
            content = v.content;
          }
      });
      return (
        <Topic title={elem.title} content={content} key={i} topicId={elem.topicId}></Topic>
      )
    });
    var el_new_topic =
    <RaisedButton label="Create new topic" key="Create new topic" onTouchTap={this._createTopic} style={{marginTop: 5, marginLeft: 5}}/>
    el_topics.push(el_new_topic);
    return (
      <div style={{
          "position": "relative",
          "display": "flex",
          "padding": 30,
          "flexWrap": "wrap"
        }}>
        <p style={{"flex": "1 0 100%", "paddingLeft": 5}}>
          {this.props.branchName}
        </p>
        {el_topics}
      </div>
    );
  }

});

module.exports = Topics;

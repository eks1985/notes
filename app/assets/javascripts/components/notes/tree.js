import React from 'react';
import {PropTypes} from 'react';

import Branch from './branch';

var Tree = React.createClass({

  contextTypes: {
    tree: PropTypes.object
  },

  getChildrenJsx: function (ch, level) {
    var self = this;
    level += 1;
    if (ch == null) {
      return null;
    } else {
      var arr = Object.keys(ch).map(function (ch_key, i) {
        var ch_new = self.getChildrenJsx(ch[ch_key].ch, level);
        var collapse = level == 0 ? false : true;
        return (
          <Branch key={ch_key} collapse={collapse} level={level} text={ch[ch_key].descr} ch={ch_new} topics={ch[ch_key].topics}>
            {ch_new}
          </Branch>
        )
      });
      return arr;
    }
  },

  render: function() {
    console.log(this.context.tree);
    var ch = this.getChildrenJsx(this.context.tree["category_records"].ch, 0);
    return (
      <div>
        {ch}
      </div>
    );
  },

});

export default Tree

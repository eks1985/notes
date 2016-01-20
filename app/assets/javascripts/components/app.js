// import React from 'react'
import React, {PropTypes, Component} from 'react';
import Paper from 'material-ui/lib/paper';
import AppBar from 'material-ui/lib/app-bar'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import NotebookSelect from './notes2/notebook-select';

export default class App extends Component {
  
  constructor(props) {
    super(props);
  }
  
  _selectTab = (value, e, tab) => {
    console.log(value);
    // console.log(e);
    // console.log(tab);
  };
  
  render() {
    var styles = {
      appBar: {
        flexWrap: 'wrap',
      },
      tabs: {
        width: '100%',
      },
    };
    
    return (
      <div>
        <AppBar title="My notes" style={styles.appBar}>
          <Tabs title="This is title" style={styles.tabs} onChange={this._selectTab}>
            <Tab label="Notebooks" style={{padding: 20}} value="1">
            </Tab>
            <Tab label="Topics" style={{padding: 20}} value="2">
            </Tab>
          </Tabs>  
        </AppBar>
        <NotebookSelect />
      </div>
    );
  }
}

// module.exports = App;

import React from 'react';
import Paper from 'material-ui/lib/paper';
import AppBar from 'material-ui/lib/app-bar'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import NotebookSelect from './notes2/notebook-select';

import Main from './notes/main';

class App extends React.Components {
  
  // constructor(props) {
  //   super(props);
  // }
  
  // handleActiveA = () => {
  //   alert("A");
  // };
  
  render() {
    var styles = {
      appBar: {
        flexWrap: 'wrap',
      },
      tabs: {
        width: '100%',
      },
    };
    var el =
      <Tabs  >
        <Tab label="Notebooks" style={{padding: 20}} value="a" onActive={this.handleActiveA}>
          <div>This is content</div>
        </Tab>
        <Tab label="Topics" style={{padding: 20}} value="b">
        </Tab>
      </Tabs>
    return (
      <div>
        <AppBar title="My notes" style={styles.appBar}>
          <Tabs title="This is title" style={styles.tabs}>
            <Tab label="Notebooks" style={{padding: 20}}>
            </Tab>
            <Tab label="Topics" style={{padding: 20}}>
            </Tab>
          </Tabs>  
        </AppBar>
      </div>
    );
  }
}

module.exports = App;

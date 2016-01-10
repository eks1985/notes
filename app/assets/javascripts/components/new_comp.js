import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class CustomAppBar extends Component {
  
  static propTypes = {
    qty: PropTypes.number.isRequired  
  };
  
  static defaultProps = {
    qty: 10
  };
  
  constructor(props) {
    super(props);
    this.state = {
      qty: props.qty,
      amount: 0
    };
  }
    
  render() {
    console.log(this.props);
    return (
     <AppBar title="Bar title" />
    );
  }
  
}

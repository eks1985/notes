import React from 'react';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ActionAndroid from 'material-ui/lib/svg-icons/action/three-d-rotation';
import Colors from 'material-ui/lib/styles/colors';


const iconStyles = {
  marginRight: 24,
};

function _onEnter () {
  alert("enter");  
};

const SvgIconExampleSimple = (props) => (
  <div>
    <ActionHome style={iconStyles} />
    <ActionHome style={iconStyles} color={Colors.blue500} />
    <ActionAndroid style={iconStyles} color={props.color} hoverColor={Colors.greenA200} onMouseEnter={_onEnter} />
  </div>
);

SvgIconExampleSimple.propTypes = {
    color: React.PropTypes.string
};

SvgIconExampleSimple.defaultProps = {
    color: "yellow"
};

export default SvgIconExampleSimple;
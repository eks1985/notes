window.React = require('react');
window.ReactDOM = require('react-dom');
window.ReactComponents = {};
window.ReactComponents.App = require('./components/app');
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

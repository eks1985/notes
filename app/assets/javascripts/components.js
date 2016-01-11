window.React = require('react');
window.ReactDOM = require('react-dom');
window.ReactComponents = {};
window.ReactComponents.App = require('./components/app');
window.ReactComponents.Topics = require('./components/notes/topics');
window.ReactComponents.Topic = require('./components/notes/topic');
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

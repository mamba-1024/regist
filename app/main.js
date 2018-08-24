import React from 'react';
import ReactDOM from "react-dom";
import Regist from './regist';

import 'fetch-ie8';
require('es6-promise').polyfill();

class Root extends React.Component {
    
    render() {
        return (
            <Regist />
        );
    }
}
ReactDOM.render(<Root />, document.getElementById('root'));

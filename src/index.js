import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './Components/MapContainer';
import * as serviceWorker from './serviceWorker';

const Wrapper = GoogleApiWrapper({
    apiKey: ('AIzaSyBaW5MR3dOKpTGkly7eyK8E1mjBOPyHyII')
})(MapContainer)

ReactDOM.render(<Wrapper/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

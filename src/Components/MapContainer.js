import React, { Component } from 'react';
import Marker from 'google-maps-react';
import Map from './Map'
import Search from './Search'
import SensorsDataController from '../Controllers/SensorsDataController'
import './Res/MapContainer.css';
import 'firebaseui/dist/firebaseui.css';
import FirebaseStoreSingleton from '../Stores/FirebaseStore';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { user: null }

    this.onSearchTextReceived = this.onSearchTextReceived.bind(this);
    this.onSensorUpdate = this.onSensorUpdate.bind(this);
    this.sensorDataController = new SensorsDataController();
    this.sensorDataController.subscribeToSensorsUpdates(this.onSensorUpdate);
  }

  componentDidMount() {
    const firebase = FirebaseStoreSingleton.getInstance();
    firebase.startFirebaseUILogin("#firebase-auth", result => {
      const user = result.additionalUserInfo && result.additionalUserInfo.profile
      console.log(user)
      this.setState({ user })
    })
  }

  componentWillUnmount() {
    this.sensorDataController.unsubscribeToSensorsUpdates(this.sensorRef);
  }

  onSensorUpdate(ref, sensorList) {
    this.sensorRef = ref;
    
  }

  onSearchTextReceived(text) {
    this.refs.Gmap.doSearch(text);
  }

  render() {
    return (
      <div className="MapContainer">
      <div id="firebase-auth" className="Login">
      </div>
      <div className="SearchBarContainer">
      <Search searchCallback={this.onSearchTextReceived}/>
      </div>
      <Map ref="Gmap" google={this.props.google}
      centerAroundCurrentLocation={true}>
      </Map>/>
      </div>
      )
    }
  }
  
  export default MapContainer
import React, { Component } from 'react';
import Marker from 'google-maps-react';
import Map from './Map'
import Search from './Search'
import SensorsDataController from '../Controllers/SensorsDataController'
import './Res/MapContainer.css';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.onSearchTextReceived = this.onSearchTextReceived.bind(this);
    this.onSensorUpdate = this.onSensorUpdate.bind(this);
    this.sensorDataController = new SensorsDataController();
    this.sensorDataController.subscribeToSensorsUpdates(this.onSensorUpdate);
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
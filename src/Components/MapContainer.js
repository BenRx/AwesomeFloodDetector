import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './Map'
import {InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import SensorsDataController from '../Controllers/SensorsDataController'
import './Res/MapContainer.css';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    
    this.onSearchTextReceived = this.onSearchTextReceived.bind(this);
    this.onSensorUpdate = this.onSensorUpdate.bind(this);
    this.onSensorHistoryReceived = this.onSensorHistoryReceived.bind(this);
    this.sensorDataController = new SensorsDataController();
    this.sensorDataController.subscribeToSensorsUpdates(this.onSensorUpdate);
    this.state = {
      sensorList: []
    }
  }
  
  componentWillUnmount() {
    this.sensorDataController.unsubscribeToSensorsUpdates(this.sensorRef);
  }
  
  onSensorUpdate(ref, sensorList) {
    this.sensorRef = ref;
    this.setState({sensorList: sensorList});
  }

  onSensorHistoryReceived(sensorHistory) {
    // TODO : CALL HISTORY COMPONENT HERE
  }
  
  onSearchTextReceived(text) {
    this.refs.Gmap.doSearch(text);
  }
  
  onClickMarker(markerData) {
    this.sensorDataController.getSensorHistory(markerData.sensorId, this.onSensorHistoryReceived)
  }
  
  render() {
    return (
      <div className="MapContainer">
      <div className="SearchBarContainer">
      <Search searchCallback={this.onSearchTextReceived}/>
      </div>
      <Map ref="Gmap" google={this.props.google} centerAroundCurrentLocation={true}>
      {this.state.sensorList.map(cur => {
        return <Marker key={cur.sensorId} onClick={() => {this.onClickMarker(cur)}} position={{lat: cur.latitude, lng: cur.longitude}}/>
      })}
      </Map>/>
      </div>
      )
    }
  }
  
  export default MapContainer
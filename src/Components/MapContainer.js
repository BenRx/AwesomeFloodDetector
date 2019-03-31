import React, { Component } from 'react';
import Map from './Map'
import Sidebar from './Sidebar'
import {Marker} from 'google-maps-react';
import Search from './Search'
import SensorsDataController from '../Controllers/SensorsDataController'
import EventsDataController from '../Controllers/EventsDataController'
import FirebaseStoreSingleton from '../Stores/FirebaseStore';
import './Res/MapContainer.css';
import Sidebar from './Sidebar'
import SensorInfo from './SensorInfo'
import 'firebaseui/dist/firebaseui.css';

var data = [
  [
    {date: "2015-02-02T19:32:00",value: 0.125},
    {date: "2015-02-02T19:40:00",value: 0.2}
  ],
  [
    {date: "2015-03-02T13:32:00",value: 0.3},
    {date: "2015-03-02T17:32:00",value: 0.1}
  ]
]

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchTextReceived = this.onSearchTextReceived.bind(this);
    this.onSensorUpdate = this.onSensorUpdate.bind(this);
    this.onSensorHistoryReceived = this.onSensorHistoryReceived.bind(this);
    this.onEventUpdate = this.onEventUpdate.bind(this);

    this.sensorDataController = new SensorsDataController();
    this.sensorDataController.subscribeToSensorsUpdates(this.onSensorUpdate);
    this.eventsDataController = new EventsDataController();
    this.eventsDataController.subscribeToEvents(this.onEventUpdate);

    this.state = {
      sensorList: [],
      user: null
    }
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
    this.eventsDataController.unsubscribeToEvents(this.eventRef);
  }

  onEventUpdate(ref, eventList) {
    this.eventRef = ref;
    // TODO : HYDRATE EVENT VIEW
  }
  
  onSensorUpdate(ref, sensorList) {
    this.sensorRef = ref;
    this.setState({sensorList: sensorList});
  }
  
  onSensorHistoryReceived(sensorHistory) {
    // TODO : CALL HISTORY COMPONENT HERE
  }
  
  onSearchTextReceived(text) {
    const searchResult = this.state.sensorList.find(elem => {
      return elem.sensorId === text;
    });
    if (searchResult) {
      this.refs.Gmap.recenterMap(searchResult.latitude, searchResult.longitude, 15);
    }
  }
  
  onClickMarker(markerData) {
    this.sensorDataController.getSensorHistory(markerData.sensorId, this.onSensorHistoryReceived)
  }
  
  render() {
    return (
      <div className="MapContainer">
      <div style={{zIndex:10, position:'absolute'}}>
      <SensorInfo data={data} ID='1234'/>
      </div>
      <div id="firebase-auth" className="Login">
      </div>
      <div className="SearchBarContainer">
      <Search searchCallback={this.onSearchTextReceived}/>
      </div>
      <div className="SidebarContainer">
      <Sidebar events={[]}/>
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
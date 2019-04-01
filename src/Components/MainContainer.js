import React, { Component } from 'react';
import Map from './Map'
import Sidebar from './Sidebar'
import {Marker} from 'google-maps-react';
import Search from './Search'
import ProfileButton from './ProfileButton'
import SensorInfo from './SensorInfo'
import SensorsDataController from '../Controllers/SensorsDataController'
import EventsDataController from '../Controllers/EventsDataController'
import FirebaseStoreSingleton from '../Stores/FirebaseStore';
import './Res/MainContainer.css';
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

class MainContainer extends Component {
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
      eventList: [],
      user: null
    }
  }
  
  componentDidMount() {
    const firebase = FirebaseStoreSingleton.getInstance();
    firebase.startFirebaseUILogin("#firebase-auth", user => {
      this.setState({ user })
    })
  }
  
  componentWillUnmount() {
    this.sensorDataController.unsubscribeToSensorsUpdates(this.sensorRef);
    this.eventsDataController.unsubscribeToEvents(this.eventRef);
  }

  onEventUpdate(ref, eventList) {
    this.eventRef = ref;
    this.setState({eventList: eventList});
  }
  
  onSensorUpdate(ref, sensorList) {
    this.sensorRef = ref;
    this.setState({sensorList: sensorList});
  }
  
  onSensorHistoryReceived(sensorHistory) {
    this.refs.SensorInfo.setData(sensorHistory);
    this.refs.SensorInfo.toggleModal();
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
      <div className="MainContainer">
      <div>
      <SensorInfo ref="SensorInfo"/>
      </div>
      {this.state.user ? (
        <div className="UserProfile">
          <ProfileButton user={this.state.user} />
        </div>
      ) : (
        <div id="firebase-auth" className="Login"></div>
      )}
      
      <div className="SearchBarContainer">
      <Search searchCallback={this.onSearchTextReceived}/>
      </div>
      <div className="SidebarContainer">
      <Sidebar events={this.state.eventList}/>
      </div>
      <Map ref="Gmap" google={this.props.google} centerAroundCurrentLocation={true}>
      {this.state.sensorList.map(cur => {
        return <Marker key={cur.sensorId} onClick={() => {this.onClickMarker(cur)}} position={{lat: cur.latitude, lng: cur.longitude}}/>
      })}
      </Map>
      </div>
      )
    }
  }
  
  export default MainContainer
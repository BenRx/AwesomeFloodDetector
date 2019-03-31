import React, { Component } from 'react';
import Map from './Map'
import Search from './Search'
import './Res/MapContainer.css';
import Sidebar from './Sidebar'

class MapContainer extends Component {
    render() {
        return (
          <div className="MapContainer">
            <div className="SearchBarContainer">
              <Search/>
            </div>
            <div className="SidebarContainer">
              <Sidebar events={[]}/>
            </div>
            <Map google={this.props.google}
            centerAroundCurrentLocation={true}/>
          </div>
        )
    }
}

export default MapContainer
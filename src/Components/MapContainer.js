import React, { Component } from 'react';
import Map from './Map'
import Search from './Search'
import './Res/MapContainer.css';
import Sidebar from './Sidebar'


var event = [{ 
  id : "http://environment.data.gov.uk/flood-monitoring/id/floods/91436" ,
  description : "Optional more precise description" ,
  eaAreaName : "Area" ,
  eaRegionName : "Region",
  floodArea : { 
    id : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953" ,
    county : "North Yorkshire" ,
    notation : "122WAC953" ,
    polygon : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953/polygon" ,
    riverOrSea : "River Name"
  },
  floodAreaID : "122WAC953" ,
  message: "This is an example flood alert. Its severity is displayed at the top on a range from 1 (Severe) to 4 (No longer in force), and the color set proportionally to it. It is currently set at the maximum. This message can be updated until the flood warning is over, and has a 'last updated' timestamp at the bottom right it this window. During high flood warnings, those alerts can be updated up to once every 15 minutes. This alert also has example data for you to understand what each data refers to. See the alert below for comparison.",
  severity : "Severe Flood Warning" ,
  severityLevel : 1,
  timeMessageChanged : "2015-02-02T19:32:00" ,
  timeRaised : "2015-02-02T19:32:00" ,
  timeSeverityChanged : "2015-02-02T19:32:00"
}, { 
  id : "http://environment.data.gov.uk/flood-monitoring/id/floods/91436" ,
  description : "North Sea Coast from Whitby to Filey" ,
  eaAreaName : "Yorkshire" ,
  eaRegionName : "North East" ,
  floodArea : { 
    id : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953" ,
    county : "North Yorkshire" ,
    notation : "122WAC953" ,
    polygon : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953/polygon" ,
    riverOrSea : "North Sea"
  },
  floodAreaID : "122WAC953" ,
  isTidal : true ,
  message: "This alert is of a lesser severity, thus its level is lower, and the color different. Some alerts might not have any message, as is the case for the next two alerts shown here. Those next two alerts are also on a lesser severity level.",
  severity : "Flood Warning" ,
  severityLevel : 2,
  timeMessageChanged : "2015-02-02T19:32:00" ,
  timeRaised : "2015-02-02T19:32:00" ,
  timeSeverityChanged : "2015-02-02T19:32:00"
}, { 
  id : "http://environment.data.gov.uk/flood-monitoring/id/floods/91436" ,
  description : "North Sea Coast from Whitby to Filey" ,
  eaAreaName : "Yorkshire" ,
  eaRegionName : "North East" ,
  floodArea : { 
    id : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953" ,
    county : "North Yorkshire" ,
    notation : "122WAC953" ,
    polygon : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953/polygon" ,
    riverOrSea : "North Sea"
  },
  floodAreaID : "122WAC953" ,
  isTidal : true ,
  severity : "Flood Alert" ,
  severityLevel : 3,
  timeMessageChanged : "2015-02-02T19:32:00" ,
  timeRaised : "2015-02-02T19:32:00" ,
  timeSeverityChanged : "2015-02-02T19:32:00"
}, { 
  id : "http://environment.data.gov.uk/flood-monitoring/id/floods/91436" ,
  eaAreaName : "Yorkshire" ,
  eaRegionName : "North East" ,
  floodArea : { 
    id : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953" ,
    county : "North Yorkshire" ,
    notation : "122WAC953" ,
    polygon : "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953/polygon" ,
    riverOrSea : "North Sea"
  },
  floodAreaID : "122WAC953" ,
  isTidal : true ,
  severity : "Warning no Longer in Force" ,
  severityLevel : 4,
  timeMessageChanged : "2015-02-02T19:32:00" ,
  timeRaised : "2015-02-02T19:32:00" ,
  timeSeverityChanged : "2015-02-02T19:32:00"
}]

class MapContainer extends Component {
    render() {
        return (
          <div className="MapContainer">
            <div className="SearchBarContainer">
              <Search/>
            </div>
            <div className="SidebarContainer">
              <Sidebar events={event}/>
            </div>
            <Map google={this.props.google}
            centerAroundCurrentLocation={true}/>
          </div>
        )
    }
}

export default MapContainer
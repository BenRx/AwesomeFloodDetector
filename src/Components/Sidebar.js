import React from "react";
import Sidebar from "react-sidebar";
import Event from './Event'
 
class EventBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      testMode: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open, testMode: false });
  }
 
  renderEvents(events) {
    if (events == null || events.length == 0)
      return (
        <div>
          <p className='Over'>
            There is currently no flooding event. To display some examples of flood alerts, press the button below.
          </p>
          <button onClick={() => {this.setState({ sidebarOpen: true, testMode: true });}}>Test</button>
        </div>
      );
    var mappedEvents = events.map(event => {
      return (<Event event={event}/>)
    });
    return (mappedEvents);
  }

  render() {
    const event = [{ 
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

    return (
      <Sidebar
        sidebar={this.renderEvents(this.state.testMode ? event : this.props.events)}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "transparent", marginTop: 45 }, content: {zIndex: 3, width:50, height: 45, overflow: 'hidden'}}}
        shadow={false}
      >
      <button style={{background: 'transparent', border: 'none'}} onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)} >
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
      </button>
      </Sidebar>
    );
  }
}
 
export default EventBar;
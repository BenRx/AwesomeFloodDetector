import React from "react";
import Sidebar from "react-sidebar";
import Event from './Event'
 
class EventBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      events: [{sensorID:'123', areaID:'Canterbury'}, {sensorID:'321', areaID:'Ashford'}]
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  renderEvents(events) {
    var mappedEvents = events.map(event => {
      return (<Event
        sensorID={event.sensorID}
        areaID={event.areaID}
      />)
    });
    return (mappedEvents);
  }

  render() {
    return (
      <Sidebar
        sidebar={this.renderEvents(this.state.events)}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    );
  }
}
 
export default EventBar;
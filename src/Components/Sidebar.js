import React from "react";
import Sidebar from "react-sidebar";
import Event from './Event'
 
class EventBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  renderEvents(events) {
    if (events == null)
      return null;
    var mappedEvents = events.map(event => {
      return (<Event event={event}/>)
    });
    return (mappedEvents);
  }

  render() {
    return (
      <Sidebar
        sidebar={this.renderEvents(this.props.events)}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "transparent" }, content: {zIndex: 4}}}
        shadow={false}
      >
        <button onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
          Open sidebar
        </button>
      </Sidebar>
    );
  }
}
 
export default EventBar;
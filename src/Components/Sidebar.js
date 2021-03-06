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
    if (events == null || events.length === 0)
      return (
        <div>
          <p className='Over'>
            There is currently no flooding event. To display some examples of flood alerts, press the button below.
          </p>
          <button onClick={() => {fetch('http://www.dulis.fr:3001/')}}>Test</button>          
        </div>
      );
      var mappedEvents = events.map(event => {
      return (<Event key={event.floodAreaID} event={event}/>)
    });
    return (mappedEvents);
  }

  render() {
    return (
      <Sidebar
        sidebar={this.renderEvents(this.props.events)}
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
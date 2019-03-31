import React, { Component } from "react";
import './Event.css';

class Event extends Component {
      render() {
        let severity;
        switch (this.props.event.severityLevel) {
          case 1:
            severity = 'Severe'
            break;
          case 2:
            severity = 'Warning'
            break;
          case 3:
            severity = 'Alert'
            break;
          default:
            severity = 'Over'
            break;
        }

        let messageClass = 'Message'
        if (this.props.event.message == null)
          messageClass = "NoMessage"
        return (
          <div className={severity}>
                <div><b>LEVEL {this.props.event.severityLevel} : {this.props.event.severity}</b></div>
                <div>{this.props.event.floodArea.riverOrSea} in {this.props.event.eaAreaName} ({this.props.event.eaRegionName}) {this.props.event.description}</div>
                <div className={messageClass}>
                  {this.props.event.message}
                  <div className='Information'>{this.props.event.timeMessageChanged}</div>
                </div>
                <div className='Information'>Raised at {this.props.event.timeRaised}, last updated at {this.props.event.timeSeverityChanged}</div>
          </div>
        );
      }
}

export default Event;
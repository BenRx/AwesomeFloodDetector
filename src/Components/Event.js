import React, { Component } from "react";
import './Res/Event.css';
import moment from 'moment'

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
                  <div className='Information'>{moment(this.props.event.timeMessageChanged).format('YY/MM/DD, HH:mm:ss')}</div>
                </div>
                <div className='Information'>Raised at {moment(this.props.event.timeRaised).format('YY/MM/DD, HH:mm:ss')}, last updated at {moment(this.props.event.timeSeverityChanged).format('YY/MM/DD, HH:mm:ss')}</div>
          </div>
        );
      }
}

export default Event;
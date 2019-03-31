import React, { Component } from "react";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: true,
          sensorID: props.sensorID,
          areaID: props.areaID
        };
      }

      render() {
        return (
            <div>
                <b>{this.state.sensorID}</b>
                <button onClick={() => alert(this.state.areaID)}>
                    Test
                </button>
            </div>
        );
      }
}

export default Event;
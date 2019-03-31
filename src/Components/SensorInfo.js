import React from "react";
import AriaModal from "react-aria-modal"
import "./Res/SensorInfo.css"
import HistGraph from './HistoryGraph'
 
class SensorInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: true,
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  };

  deactivateModal = () => {
    this.setState({ modalActive: false });
  };

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  myExitHandler = () => {
      this.deactivateModal();
  };

  render() {
    const modal = this.state.modalActive
      ?<AriaModal
      onExit={this.myExitHandler}
      focusDialog={true}
      titleId='modal-title'
      verticallyCenter={true}
    >
      <div className='Sensor-modal'>
        <h2 id='modal-title'>History of sensor #{this.props.ID}</h2>
        <HistGraph data={this.props.data} size={[400,400]} />
        <button onClick={this.deactivateModal}>Close</button>
      </div>

    </AriaModal>
      : false;

    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        {modal}
      </div>
    );
  }
}

export default SensorInfo;
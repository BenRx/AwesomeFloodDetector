import React from "react";
import AriaModal from "react-aria-modal"
import "./Res/SensorInfo.css"
import HistGraph from './HistoryGraph'
 
class SensorInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      id: "1234",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  toggleModal = () => {
    this.setState({ modalActive: !this.state.modalActive });
  };

  setData = (data) => {
    this.setState({id: Object.values(Object.values(data)[0])[0].sensorId, data: data})
  }

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  myExitHandler = () => {
      this.toggleModal();
  };

  render() {
    let isFavorite = true;
    const modal = this.state.modalActive
      ?<AriaModal
      onExit={this.myExitHandler}
      focusDialog={true}
      titleId='modal-title'
      verticallyCenter={true}
    >
      <div className='Sensor-modal'>
        <button onClick={this.toggleModal}>Close</button>
        <button style={{background: 'transparent', border: 'none', verticalAlign:'right', float: 'right'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill={isFavorite ? 'orange' : 'none'}/><path d="M0 0h24v24H0z" fill='none'/></svg>
        </button>
        <h2 id='modal-title'>History of sensor #{this.state.id}</h2>
        <HistGraph data={this.state.data} size={[400,400]} />
      </div>

    </AriaModal>
      : false;

    return (
      <div>
        {modal}
      </div>
    );
  }
}

export default SensorInfo;
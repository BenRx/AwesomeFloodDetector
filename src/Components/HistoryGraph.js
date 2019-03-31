import React, {Component} from 'react';
import {Line} from 'react-chartjs'
import moment from 'moment'

class Chart extends Component {
    constructor(props) {
        super(props);
        let labelList = [];
        let dataList = [];
        this.props.data.forEach((day) => {
            day.forEach(measure => {
                labelList.push(moment(measure.date).format('YY/MM/DD, HH:mm:ss'));
                dataList.push(measure.value);
            });
        })
        this.state = {
            chartData: {
                labels: labelList,
                datasets: [{
                    label: "Water level",
                    fillColor: "rgba(220,220,220,0)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    data: dataList
                }]
            }
        };
    }

    render() {
        return (<div>
            <Line data={this.state.chartData} width="400" height="400"/>
            </div>)
    }
}

export default Chart
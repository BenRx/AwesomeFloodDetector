import React, {Component} from 'react';
import {Line} from 'react-chartjs'
import moment from 'moment'

class Chart extends Component {
    constructor(props) {
        super(props);
        let labelList = [];
        let dataList = [];
        for (var day of Object.values(this.props.data)) {
            for (var measure of Object.values(day)) {
                labelList.push(moment(measure.date).format('YY/MM/DD, HH:mm:ss'));
                dataList.push(measure.value);
            }
        }
        this.state = {
            chartData: {
                labels: labelList,
                datasets: [{
                    label: "Water level",
                    fillColor: "rgba(220,220,220,0)",
                    strokeColor: "rgba(50,50,220,1)",
                    pointColor: "rgba(50,50,220,1)",
                    data: dataList
                }]
            }
        };
    }

    render() {
        return (<div>
            <Line data={this.state.chartData} key={this.props.size[0] + this.props.size[1]} width={this.props.size[0]} height={this.props.size[1]}/>
            </div>)
    }
}

export default Chart
import React, {Component} from 'react';
import {Line} from 'react-chartjs'

class BarChart extends Component {
render() {
    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    return (<div>
        <Line data={chartData} options={{}} width="400" height="400"/>
        </div>)
   }
}
export default BarChart
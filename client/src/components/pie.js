import React, { Component } from 'react';
import ReactD3 from 'react-d3-components';
import Chart from 'react-d3-core';
const PieChart = ReactD3.PieChart;

export default class Pie extends Component {
  render() {
    const pieData = {
        label: 'somethingA',
        values: [{x: 'Income', y: this.props.income}, {x: 'Expenses', y: this.props.expense}]
    };
    const sort = null;

    const chartSeries = [
      {
        field: 'x',
        name: 'x',
        color: 'red'
      }
    ];
    const x = function(d) {
      return d.index;
    }

    return(
      <div>
        <PieChart
          data={pieData}
          width={400}
          height={200}
          margin={{top: 10, bottom: 10, left: 100, right: 100}}
          sort={sort}
          chartSeries={chartSeries}
          innerRadius={20}
          radius={50}
          //x={x}
        />
      </div>
    );
  }
}

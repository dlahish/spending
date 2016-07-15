import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis } from 'victory';
const BABY_BLUE_COLOR = "#ccdee8";
const BLUE_COLOR = "#00a3de";
const RED_COLOR = "#7c270b";

const styles = {
  parent: {
    boxSizing: "border-box",
    display: "inline",
    padding: 0,
    backgroundColor: BABY_BLUE_COLOR,
    fontFamily: "'Fira Sans', sans-serif",
    width: "60%",
    height: "auto"
  },

  axisOne: {
    grid: {
      stroke: (tick) =>
        tick === 0 ? "transparent" : "#ffffff",
      strokeWidth: 1
    },
    axis: { strokeWidth: 1 },
    ticks: { strokeWidth: 0 },
    tickLabels: { fontSize: 9 }
  },

  axisTwo: {
    axis: {
      stroke: RED_COLOR,
      strokeWidth: 1
    },
    ticks: {
      strokeWidth: 0
    },
    tickLabels: {
      fill: BLUE_COLOR,
      fontFamily: "inherit",
      fontSize: 10
    }
  },

  lineOne: {
    data: {
      stroke: BLUE_COLOR,
      strokeWidth: 4.5
    }
  }
}

export default class CustomTheme extends Component {

  getDataSetOne() {
    const data = this.props.data;
    console.log('DATA PROPS IN CHART');
    console.log(data);
    let IncomeLineData = [];
    data.map((d,i) => {
      const obj = {};
      obj.x = i;
      obj.y = d.income;
      IncomeLineData.push(obj);
      // rObj.x = i;
      // rObj.y = d.income;
      // IncomeLineData.push(rObj);
    });
    console.log('Income Like Data');
    console.log(IncomeLineData);
    console.log(typeof IncomeLineData);
    // const ddd = [
    //   {x: 0, y: data[0].income},
    //   {x: 1, y: data[1].income},
    //   {x: 2, y: data[2].income},
    //   {x: 3, y: data[3].income}
    // ];
    return IncomeLineData;
  };

  render() {
    const data = this.getDataSetOne();
    return (
      <div>
        <svg style={{ width: 600, height: 600 }}>
          <VictoryChart>
            <VictoryAxis dependentAxis
              style={styles.axisOne}
              domain={[0, 12000]}
            />

            <VictoryAxis
              style={styles.axisTwo}
              tickValues={[0,1,2,3,4,5,6,7,8,9,10,11]}
              tickFormat={[
                "Jan",
                "Feb",
                "March",
                "April",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec"
              ]}
            />

            <VictoryLine
              data={data}
              //interpolation="catmullRom"
              label="INCOME"
              style={styles.lineOne}
            />
          </VictoryChart>
        </svg>
      </div>
    );
  }
}

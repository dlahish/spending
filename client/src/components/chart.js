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
    const ddd = [
      {x: 0, y: data[0].income},
      {x: 1, y: data[1].income},
      {x: 2, y: data[2].income},
      {x: 3, y: data[3].income}
    ];
    // return IncomeLineData;
    const ddw =
    [
      {x: new Date(2000, 1, 1), y: 12},
      {x: new Date(2000, 6, 1), y: 10},
      {x: new Date(2000, 12, 1), y: 11},
      {x: new Date(2001, 1, 1), y: 5},
      {x: new Date(2002, 1, 1), y: 4},
      {x: new Date(2003, 1, 1), y: 6},
      {x: new Date(2004, 1, 1), y: 5},
      {x: new Date(2005, 1, 1), y: 7},
      {x: new Date(2006, 1, 1), y: 8},
      {x: new Date(2007, 1, 1), y: 9},
      {x: new Date(2008, 1, 1), y: -8.5},
      {x: new Date(2009, 1, 1), y: -9},
      {x: new Date(2010, 1, 1), y: 5},
      {x: new Date(2013, 1, 1), y: 1},
      {x: new Date(2014, 1, 1), y: 2},
      {x: new Date(2015, 1, 1), y: -5}
    ];

    return ddw;
  };

  render() {
    const data = this.getDataSetOne();
    return (
      <div>
        <svg
          style={styles.parent}
          viewBox="0 0 450 350"
        >
          <g transform={"translate(0, 40)"}>
            <VictoryAxis dependentAxis

            />

            <VictoryAxis
              //tickValues={[
              //  "Jan",
              //  "Feb",
              //  "March",
              //  "April",
              //  "May",
              //  "June",
              //  "July",
              //  "Aug",
              //  "Sept",
              //  "Oct",
              //  "Nov",
              //  "Dec"
              //]}
            />

            <VictoryLine
              data={data}
            />
          </g>
        </svg>
      </div>
    );
  }
}

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
  },

  lineTwo: {
    data: {
      stroke: RED_COLOR,
      strokeWidth: 4.5
    }
  }
}

export default class CustomTheme extends Component {

  getDataIncome() {
    const data = this.props.data;
    let IncomeLineData = [];
    data.map((d,i) => {
      const obj = {};
      obj.x = i;
      obj.y = d.income;
      IncomeLineData.push(obj);
    });

    return IncomeLineData;
  };

  getDataExpenses() {
    const data = this.props.data;
    let IncomeLineData = [];
    data.map((d,i) => {
      const obj = {};
      obj.x = i;
      obj.y = d.expenses;
      IncomeLineData.push(obj);
    });

    return IncomeLineData;
  };

  render() {
    const dataIncome = this.getDataIncome();
    const dataExpenses = this.getDataExpenses();

    return (
      <div style={{ width: '50%', height: 'auto', display: 'inline-block' }}>
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
              data={dataIncome}
              //interpolation="catmullRom"
              //label="INCOME"
              style={styles.lineOne}
            />

            <VictoryLine
              data={dataExpenses}
              //interpolation="catmullRom"
              //label="EXPENSES"
              style={styles.lineTwo}
            />

          </VictoryChart>

      </div>
    );
  }
}

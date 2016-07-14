import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart, VictoryLine, VictoryLabel } from 'victory';
import { teal700 , grey50, red900 } from 'material-ui/styles/colors';

const Chart = ({income, expenses}) => {
  // const income = this.props.income;
  // const expenses = this.props.expenses;

  return (
    <div>

      <VictoryChart
        width={240}
        height={140}
      >
        <VictoryLabel
          x={25} y={70}
          verticalAnchor="end"
          lineHeight={1.2}
          //style={styles.labelOne}
        >
          {"Economy \n % change on a year earlier"}
        </VictoryLabel>
        <VictoryLine
          data={[
            {x: 0, y: 1},
            {x: 1, y: 3},
            {x: 2, y: 2},
            {x: 3, y: 4},
            {x: 4, y: 3},
            {x: 5, y: 5}
          ]}
        />
      </VictoryChart>
    </div>
  );

  // Chart.propTypes = {
  //   income: React.propTypes.number,
  //   expenses: React.propTypes.number
  // };
}

export default Chart;

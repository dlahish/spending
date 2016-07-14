import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
import { teal700 , grey50, red900 } from 'material-ui/styles/colors';

const Pie = ({income, expenses}) => {
  // const income = this.props.income;
  // const expenses = this.props.expenses;

  return (
    <VictoryPie
      data={[
        {x: "Income", y: income},
        {x: "Expenses", y: expenses},
      ]}
      style={{
        labels: {
          fontSize: 5,
          padding: 0,
          fontWeight: 'bold'
        }
      }}
      colorScale={[
        teal700,
        red900
      ]}
      height={60}
      padding={2}
      innerRadius={15}
      padAngle={2}
    />
  );

  Pie.propTypes = {
    income: React.propTypes.number,
    expenses: React.propTypes.number
  };
}

export default Pie;

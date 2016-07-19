import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
import { teal700 , grey50, red900 } from 'material-ui/styles/colors';

const Pie = ({income, expenses}) => {

  return (
    <div style={{ width: '50%', height: 'auto', display: 'inline-block' }}>
      <VictoryPie
        data={[
          {x: "Income", y: income},
          {x: "Expenses", y: expenses},
        ]}
        style={{
          labels: {
            fontSize: 11,
            padding: 0,
            fontWeight: 'bold'
          }
        }}
        //width={50}
        colorScale={[
          teal700,
          red900
        ]}
        height={250}
        //padding={2}
        innerRadius={35}
        padAngle={2}
      />
    </div>
  );

  Pie.propTypes = {
    income: React.propTypes.number,
    expenses: React.propTypes.number
  };
}

export default Pie;

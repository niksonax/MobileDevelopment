import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const xValues = [];
const yValues = [];

function fillInValues(xArr, yArr) {
  for (
    let i = -2 * Math.PI - Math.PI / 2;
    i <= 2 * Math.PI + Math.PI / 2;
    i += Math.PI
  ) {
    xArr.push(i.toFixed(2));
    yArr.push(Math.sin(i));
  }
}

fillInValues(xValues, yValues);

const Graph = () => {
  return (
    <LineChart
      data={{
        labels: xValues,
        datasets: [
          {
            data: yValues,
            strokeWidth: 3,
          },
        ],
      }}
      width={Dimensions.get('window').width - 16}
      height={220}
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 255) => `rgba(3, 182, 252, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      withDots={false}
      withOuterLines={false}
      segments={2}
      yAxisInterval={2.5}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default Graph;

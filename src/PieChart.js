import React from 'react';
import {Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const data = [
  {
    name: 'Blue',
    percentage: 80,
    color: 'blue',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Orange',
    percentage: 10,
    color: 'orange',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Light Blue',
    percentage: 5,
    color: '#14e0ff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Brown',
    percentage: 5,
    color: 'brown',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const MyPieChart = () => {
  return (
    <PieChart
      data={data}
      width={Dimensions.get('window').width - 16}
      height={220}
      chartConfig={{color: (opacity = 255) => `rgba(3, 182, 252, ${opacity})`}}
      accessor={'percentage'}
      backgroundColor={'transparent'}
      paddingLeft={'15'}
      center={[10, 20]}
      absolute
    />
  );
};

export default MyPieChart;

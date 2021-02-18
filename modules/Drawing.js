import React, {useState} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import Graph from './SinGraph';
import MyPieChart from './PieChart';

const Drawing = () => {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => setSwitchValue(value);

  const CurrentTask = () => (switchValue ? <MyPieChart /> : <Graph />);

  const CurrentTaskName = () =>
    switchValue ? <Text>Task B</Text> : <Text>Task A</Text>;

  return (
    <View style={styles.container}>
      <CurrentTaskName />
      <Switch
        style={({marginTop: 30}, {marginBottom: 60})}
        onValueChange={toggleSwitch}
        value={switchValue}
      />
      <CurrentTask />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Drawing;

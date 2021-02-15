/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * TEST
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const student = ['Канюка Микита', 'Група ІО-81', 'ЗК ІО-8111'];

function renderStudentData() {
  return (
    <View style={styles.center}>
      {student.map(function (item, index) {
        return (
          <Text style={styles.center_text} key={index}>
            {item}
          </Text>
        );
      })}
    </View>
  );
}

function item2() {
  return <View></View>;
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'StudentData') {
              iconName = 'man-outline';
            } else if (route.name === 'Item2') {
              iconName = 'settings-outline';
            }

            let iconColor = focused ? '#1fc5f2' : 'black';

            // You can return any component that you like here!
            return <Icon name={iconName} size={32} color={iconColor} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1fc5f2',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 20,
            padding: 3,
          },
          style: {
            height: 70,
          },
        }}>
        <Tab.Screen name="StudentData" component={renderStudentData} />
        <Tab.Screen name="Item2" component={item2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  center_text: {
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;

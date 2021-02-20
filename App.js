/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * TEST
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawing from './modules/Drawing';
import BooksList from './modules/BooksList';

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

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === 'StudentData') {
              iconName = 'man-outline';
            } else if (route.name === 'Drawing') {
              iconName = 'pencil-outline';
            } else if (route.name === 'BooksList') {
              iconName = 'book-outline';
            }

            let iconColor = focused ? '#1fc5f2' : 'black';

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
        <Tab.Screen name="Drawing" component={Drawing} />
        <Tab.Screen name="BooksList" component={BooksList} />
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

import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawing from './src/Drawing';
import BooksList from './src/BooksList';
import DetailBook from './src/DetailBook';
import BookAdd from './src/BookAdd';
import ImagesCollection from './src/ImagesCollection';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {IconButton, Colors} from 'react-native-paper';
import ImageAdd from './src/ImageAdd';

const student = ['Канюка Микита', 'Група ІО-81', 'ЗК ІО-8111'];

function StudentData(props) {
  props.navigation.setOptions({});
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getHeader(route) {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'Drawing':
      return false;
    case 'Student':
      return false;
    case 'Books':
      return true;
    case 'Images': // Ask Nazar
      return true;
  }
}
function getHeaderRight(route, navigation) {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'Drawing':
      return null;
    case 'Student':
      return null;
    case 'Books':
      return (
        <IconButton
          icon="plus"
          color={Colors.lightBlueA700}
          size={35}
          onPress={() => navigation.navigate('BookAdd')}
        />
      );
    case 'Images':
      return (
        <IconButton
          icon="plus"
          color={Colors.lightBlueA700}
          size={35}
          onPress={() => ImageAdd(navigation, route)}
        />
      );
  }
}

function TabGeneral({navigation, route}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: getHeader(route),
      headerTitle: '',
      headerRight: () => getHeaderRight(route, navigation),
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Student') {
            iconName = 'man-outline';
          } else if (route.name === 'Drawing') {
            iconName = 'pencil-outline';
          } else if (route.name === 'Books') {
            iconName = 'book-outline';
          } else if (route.name === 'Images') {
            iconName = 'images-outline';
          }

          let iconColor = focused ? '#1fc5f2' : 'black';

          return <Icon name={iconName} size={28} color={iconColor} />;
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
      <Tab.Screen name="Student" component={StudentData} />
      <Tab.Screen name="Drawing" component={Drawing} />
      <Tab.Screen name="Books" component={BooksList} />
      <Tab.Screen name="Images" component={ImagesCollection} />
    </Tab.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: '',
        }}>
        <Stack.Screen name="TabGeneral" component={TabGeneral} />
        <Stack.Screen name="DetailBook" component={DetailBook} />
        <Stack.Screen name="BookAdd" component={BookAdd} />
      </Stack.Navigator>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
});

export default App;

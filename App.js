import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from './screens/LoginScreen';
import MessagesScreen from './screens/MessagesScreen';
import FarmsScreen from './screens/FarmsScreen';
import SignUpScreen from './screens/SignupScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  
       <Tab.Navigator>
       <Tab.Screen name= 'Farm List' component={FarmsScreen} />
       <Tab.Screen name= 'Messages' component={MessagesScreen} />
      </Tab.Navigator>
    </ NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import FarmsScreen from './screens/FarmsScreen';
import SignUpScreen from './screens/SignupScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  
    <Stack.Navigator>
    <Stack.Screen name='LoginScreen' component={ LoginScreen } />
    <Stack.Screen name='SignUpScreen' component={ SignUpScreen } />
    <Stack.Screen name='FarmsScreen' component={ FarmsScreen } />

    </Stack.Navigator>
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

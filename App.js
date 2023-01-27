import { StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesScreen from './screens/MessagesScreen';
import FarmsScreen from './screens/FarmsScreen';
import FarmScreen from './screens/FarmScreen';


const FarmStack = createNativeStackNavigator();

function FarmStackScreen() {
  return (
    <FarmStack.Navigator>
      <FarmStack.Screen name="FarmsScreen" component={FarmsScreen} />
      <FarmStack.Screen name="FarmScreen" component={FarmScreen} />
    </FarmStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>  
       <Tab.Navigator>
       <Tab.Screen name= 'Farm List' component={FarmStackScreen} />
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

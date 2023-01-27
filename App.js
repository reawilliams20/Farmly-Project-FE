import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FarmsScreen from './screens/FarmsScreen';
import FarmScreen from './screens/FarmScreen';
import LoginScreen from './screens/LoginScreen';
import { UserProvider } from './user';
import MessagesScreen from './screens/MessagesScreen';

const Tab = createBottomTabNavigator();


function FarmsTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Farms" component={FarmsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="FarmsScreen" options={{ title: "Home" }} component={FarmsTab}/>
        <Stack.Screen name="FarmScreen" options={{ title: "Individual Farm" }} component={FarmScreen} />
      </Stack.Navigator>
    </ NavigationContainer>  
    </UserProvider>
  
  );
}

export { FarmsTab }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

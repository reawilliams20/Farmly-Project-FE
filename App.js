import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesScreen from './screens/MessagesScreen';
import FarmsScreen from './screens/FarmsScreen';
import FarmScreen from './screens/FarmScreen';
import LoginScreen from './screens/LoginScreen';
import { UserProvider } from './user';

const Tab = createBottomTabNavigator();
const FarmStack = createNativeStackNavigator();

function FarmStackScreen() {
  return (
    <FarmStack.Navigator screenOptions={{ headerShown: false }}>
      <FarmStack.Screen name="FarmsScreen" component={FarmsScreen} />
      <FarmStack.Screen name="FarmScreen" component={FarmScreen} />
    </FarmStack.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>  
      <LoginStack.Navigator>
        <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
      </LoginStack.Navigator>
    </ NavigationContainer>  
    </UserProvider>
  
  );
}



// export default function App() {
//   return (
//     <NavigationContainer>  
//        <Tab.Navigator>
//        <Tab.Screen name= 'farm' component={FarmStackScreen} />
//        <Tab.Screen name= 'Messages' component={MessagesScreen} />
//       </Tab.Navigator>
//     </ NavigationContainer>  
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

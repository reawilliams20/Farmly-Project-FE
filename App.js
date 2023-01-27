import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmList from "./screens/user/FarmList";
import SingleFarm from "./screens/user/SingleFarm";
import LoginScreen from "./screens/LoginScreen";
import ProduceList from "./screens/farmer/ProduceList";
import { UserProvider } from "./user";
import MessagesScreen from "./screens/MessagesScreen";
import MyFarm from "./screens/farmer/MyFarm";
import SignUpScreen from "./screens/SignupScreen";
import { SafeAreaView } from "react-native";
import SettingScreen from "./screens/SettingScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function FarmsTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
      name="Farms" 
      component={FarmList} 
      options={({route}) => ({
        // tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="home-outline"
            color={color}
            size={size}
          />
        ),
      })}
      />
      <Tab.Screen 
      name="Messages" 
      component={MessagesScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons
            name="chatbox-ellipses-outline"
            color={color}
            size={size}
          />
        ),
      }}
      />
      <Tab.Screen 
      name= "Setting" 
      component= {SettingScreen} 
      options={{
        // tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Ionicons 
          name="person-outline" 
          color={color} 
          size={size} 
          />
        ),
      }} 
      />
    </Tab.Navigator>
  );
}

function ProduceTab() {
  return (
    <Tab.Navigator 
    screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
      name="MyFarm" 
      component={MyFarm}
      options={({route}) => ({
        // tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="home-outline"
            color={color}
            size={size}
          />
        ),
      })} 
      />
      <Tab.Screen
       name="ProduceList"
      component={ProduceList}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="food-apple"
            color={color}
            size={size}
          />
        )} }
      />
      <Tab.Screen 
      name="Messages" 
      component={MessagesScreen} 
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons
            name="chatbox-ellipses-outline"
            color={color}
            size={size}
          />
        ),
      }}/>
      <Tab.Screen 
      name= "Setting" 
      component= {SettingScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons 
          name="person-outline" 
          color={color} 
          size={size} 
          />
        ),
      }} 
      />
      
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <SafeAreaView style= {styles.container}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignUpScreen} />
          <Stack.Screen name="ProduceList" component={ProduceTab} />
          <Stack.Screen
            name="FarmList"
            options={{ title: "Home" }}
            component={FarmsTab}
          />
          <Stack.Screen
            name="SingleFarm"
            options={{ title: "Single Farm" }}
            component={SingleFarm}
          />
          <Stack.Screen
            name="Settings"
            options={{ title: "Settings" }}
            component={ProduceTab}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
}

export { FarmsTab };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

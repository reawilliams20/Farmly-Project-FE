import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmList from "../screens/user/FarmList";
import SingleFarm from "../screens/user/SingleFarm";
import LoginScreen from "../screens/LoginScreen";
import ProduceList from "../screens/farmer/ProduceList";
import { Stack } from "./AuthStack";
import MessagesScreen from "../screens/MessagesScreen";
import MyFarm from "../screens/farmer/MyFarm";
import SettingScreen from "../screens/SettingScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
// const StackForFarms=  createNativeStackNavigator();

function FarmStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FarmList" component={FarmList} />
      <Stack.Screen name="SingleFarm" component={SingleFarm} />
    </Stack.Navigator>
  );
}

const AppStackForCustomers = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Farms"
        component={FarmStack}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStackForCustomers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

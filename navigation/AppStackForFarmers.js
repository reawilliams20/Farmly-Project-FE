import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProduceList from "../screens/farmer/ProduceList";
import { Stack } from "./AuthStack";
import MessagesScreen from "../screens/MessagesScreen";
import MyFarm from "../screens/farmer/MyFarm";
import SettingScreen from "../screens/SettingScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";


const Tab = createBottomTabNavigator();

const SettingStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={SettingScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);


const AppStack = () => {
  
  return (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="MyFarm"
        component={MyFarm}
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
        name="ProduceList"
        component={ProduceList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-apple"
              color={color}
              size={size}
            />
          ),
        }}
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
        component={SettingStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>



  //   <Stack.Navigator>
  //   <Stack.Screen name="ProduceList" component={ProduceTab} />
  //   <Stack.Screen
  //     name="FarmList"
  //     options={{ title: "Home" }}
  //     component={FarmsTab}
  //   />
  //   <Stack.Screen
  //     name="SingleFarm"
  //     options={{ title: "Single Farm" }}
  //     component={SingleFarm}
  //   />
  //   <Stack.Screen
  //     name="Settings"
  //     options={{ title: "Settings" }}
  //     component={ProduceTab}
  //   />
  // </Stack.Navigator>
  )
  
};

export default AppStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

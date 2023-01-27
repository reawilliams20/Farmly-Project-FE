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

const Tab = createBottomTabNavigator();

function FarmsTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Farms" component={FarmList} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}

function ProduceTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="MyFarm" component={MyFarm} />
      <Tab.Screen name="ProduceList" component={ProduceList} />
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
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export { FarmsTab };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

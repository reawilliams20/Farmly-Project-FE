import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import MessagesScreen from '../screens/MessagesScreen';
import FarmsScreen from '../screens/FarmsScreen';


const Tab = createBottomTabNavigator();

 const BottomTabNavigator = ({email}) =>{
    console.log(email, "in TabNabig")
    return (
        <Tab.Navigator>
            <Tab.Screen name= 'MessagesScreen' component={MessagesScreen} />
            <Tab.Screen name= 'FarmsScreen' component={FarmsScreen} />
        </Tab.Navigator>
    )
 }

 export default BottomTabNavigator;
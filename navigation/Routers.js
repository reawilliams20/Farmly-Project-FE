import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { getAuth } from "firebase/auth";
import {auth} from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./user";
import AuthStack from "./AuthStack";
import AppStackForFarmers from "./AppStackForFarmers";
import AppStackForCustomers from './AppStackForCustomers'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Routes = () => {
  const { user, setUser , type, setType, isFirstLaunch, setIsFirstLaunch } = useContext(UserContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  
  return (
    <NavigationContainer>
      {user ? (type!=="farmer" ?  <AppStackForCustomers/>: <AppStackForFarmers/>) : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

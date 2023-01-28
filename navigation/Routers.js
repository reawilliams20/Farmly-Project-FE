import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { getAuth } from "firebase/auth";
import {auth} from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./user";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Routes = () => {
  const {type, setType} = useContext(UserContext)
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  
  console.log(type, "type in the Routers");
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

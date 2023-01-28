import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./user";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Routes = () => {
  const { user, setUser } = useContext(UserContext);
  const auth = getAuth();
  const currentUser = auth.currentUser
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  console.log(currentUser, "current user")
  console.log(user, "in the Routers");
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

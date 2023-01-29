import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useContext } from "react";
import { UserContext } from "../navigation/user";
import { Input } from "react-native-elements";
import { getFarms } from "../utils/api";

const LoginScreen = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let { signin, type, setType , user, setUser, isFirstLaunch, setIsFirstLaunch }= useContext(UserContext)

    useEffect(() => {
      getFarms()
      .then((response) => {
        setFarms(response);
      });
    }, []);


    const handleLogin = (username)=>{
      const validEmail=farms.filter((farm)=>
        farm.username.toUpperCase() == username.toUpperCase()
        )
      if(validEmail.length !==0){
        setType("farmer")
      }else{
        setType("customer")
      }
  }

  return (
    <>
      <View style={styles.container}>
        <Text styles={styles.header}>Welcome to Farmly Marketplace!</Text>
        <Input
          placeholder="Enter your email"
          leftIcon={{ type: "material", name: "email" }}
          onChangeText={(username) => setEmail(username)}
          clearButtonMode="always"
          required
        />
        <Input
          leftIcon={{ type: "material", name: "lock" }}
          placeholder="Enter your password"
          onChangeText={(password) => setPassword(password)}
          clearButtonMode="always"
          secureTextEntry
          required
        />
      </View>
      <View>
        <Button
          title="Login"
          onPress={()=> [signin(email, password), handleLogin(email)]}
          style={styles.buttonText}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.underline}>
            Don't have an account? Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 60,
    fontWeight: "bold",
    marginTop: -40,
    marginBottom: 100,
    color: "#F7F6F8",
    fontFamily: "Georgia",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 100,
  },

  button: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    // height: windowHeight / 15,
    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato-Regular",
  },
  underline: {
    textDecorationLine: "underline",
  },
});

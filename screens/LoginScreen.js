import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { useContext } from "react";
import { UserContext } from "../navigation/user";
import { Input } from "react-native-elements";
import { getFarms } from "../utils/api";

const LoginScreen = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let { signin, type, setType , user, setUser, isFirstLaunch, setIsFirstLaunch, isLoggedIn, setIsLoggedIn}= useContext(UserContext)

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
        setIsFirstLaunch(false)
        setType("farmer")
        setIsLoggedIn(true)
      }else{
        setIsFirstLaunch(false)
        setType("customer")
        setIsLoggedIn(true)
      }
  }

  return (
    <>
      <View style={styles.container}>
        <Image
        style={styles.logo}
        source={require('../gif/farmlyLogo.png')}/>
        <Text style={styles.header}>Welcome to Farmly Marketplace!</Text>
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
        <Pressable
          onPress={()=> [signin(email, password), handleLogin(email)]}
          style={styles.buttonText}
        >
        <Text style={styles.text}>Log in</Text>
        </Pressable>

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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 40
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop:50,
    marginBottom: 20,
    color: "#508D3D",
    fontFamily: "Georgia",
    fontStyle:'italic'
  },
  button: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    // height: windowHeight / 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontWeight: "bold",
    backgroundColor: '#4d9900',
    alignItems:'center',
    padding:17,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 20
  },
  underline: {
    textDecorationLine: "underline"
  },
  logo:{
    width:"80%",
    height:"40%",
    borderRadius: 400/ 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize:20,
    color:'white'
  }
});

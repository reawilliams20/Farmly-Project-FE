import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { getUsers } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../navigation/user";
import { Input } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
//   let { user, setUser } = useContext(UserContext);
//   console.log(user);
  let { signin }= useContext(UserContext)

//   signin((email, password)=>{
//     setEmail(email)
//     setPassword(password)
//   })
//   console.log(email, password)



//   console.log(signin)
//   let currUsername = ""
//   let currPassword = ""

    //   useEffect(() => {
    //       getUsers()
    //       .then((res) => {
    //           setUsers(res)
    //       })
    //   }, [])

    //  const handleLogin = (username, password)=>{
    //   const validUser = users.filter((user)=>{
    //       if(user.username===username&&user.password===password){
    //           setUser(user)
    //           return user
    //       }
    //   })
    //   console.log(users)
//   if(validUser.length===0){
//       return alert("check again")

//   }
//           if(validUser.length>0){
//               if(validUser[0].type==="User"){
//                   return (
//                   navigation.navigate("FarmList")
//                   );
//               }else{
//                   return(
//                   navigation.navigate("ProduceList")
//                   )
//               }
//           }
//      }

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
        //   onPress={() => {handleLogin(currUsername, currPassword)}}
          onPress={() => signin(email, password) }
          style={styles.buttonText}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.underline}>
            Don't have an account yet? Register Now
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

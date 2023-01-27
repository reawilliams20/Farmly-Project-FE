import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { getUsers } from "../utils/api";
import { useContext } from 'react';
import { UserContext } from "../user";


const LoginScreen = ({navigation}) =>{
    const [users, setUsers] = useState([])
    let {setUser} = useContext(UserContext)
    let currUsername = ""
    let currPassword = ""

    useEffect(() => {
        getUsers()
        .then((res) => {
            setUsers(res)
        })
    }, [])
  
   const handleLogin = (username, password)=>{
  
    const validUser = users.filter((user)=>{
        if(user.username===username&&user.password===password){
            setUser(user)
            return user
        }
    })

        if(validUser.length===0){
            return alert("check again")
            
        }
        if(validUser.length>0){
            if(validUser[0].type==="User"){
                return (
                navigation.navigate("FarmList")
                );
            }else{
                return(
                navigation.navigate("ProduceList")
                )
            }          
        }
   }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput 
            placeholder="Enter your email"
            onChangeText={username=> currUsername=username}
            />
            <TextInput
            placeholder="Enter your password"
            onChangeText={password=> currPassword=password }
            //secureTextEntry
            />
            <Button 
            title = "Login"
            onPress={() => {handleLogin(currUsername, currPassword)}}
            style = {styles.button}
            />
        </View>
    )
}

export default LoginScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    button: {
        width: 370,
        marginTop: 10,
      },
})
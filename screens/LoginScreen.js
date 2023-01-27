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
  
   const handleLogin = (e)=>{
    e.preventDefault()
  


    const validUser = users.filter((user)=>{
        if(user.username===currUsername&&user.password===currPassword){
           setUser(user)
           return user
        }
    })
    console.log(validUser,"42")
        if(validUser.length===0){
            return alert("check again")
            
        }

        if(validUser.length>0){
            return (
                navigation.navigate("FarmsScreen")
                );
        }
   }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput 
            placeholder="Enter your email"
            onBlur={(email)=> currUsername = email.target.value }
            />
            <TextInput
            placeholder="Enter your password"
            onBlur={(password)=> currPassword = password.target.value }
            secureTextEntry
            />
            <Button 
            title = "Login"
            onPress={handleLogin}
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
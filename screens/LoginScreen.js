import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { getUser, getUsers } from "../utils/api";
import { useContext } from 'react';
import { UserContext } from "../user";

const LoginScreen = ({navigation}) =>{
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userValue = useContext(UserContext)
    console.log(userValue)
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
    setUsername(currUsername)
    setPassword(currPassword)
    users.map((user)=>{
        if(user.username===username&&user.password===password){
            useContext
        }
        
    })
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
            />
            <Button 
            title = "Login"
            onPress={handleLogin}
            style = {styles.button}
            />
            {/* <Input 
                placeholder="Enter your email" 
                label="Email"
                leftIcon={{ type: "material", name: "email" }}
                //value={email}
                //onChangeText={(text) => setEmail(text)}
            />
            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{ type: "material", name: "lock" }}
                //value={password}
                //onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button 
                title="sign in" 
                onPress={()=>signin(email,password)} 
                style={styles.button} 
            />
            {/* <Button
                title="register"
                onPress={() => navigation.navigate("Register")}
                style={styles.button}
            /> */}
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
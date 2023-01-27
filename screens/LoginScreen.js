import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Input } from "react-native";
import { Button } from "react-native-elements";
import { getUser, getUsers } from "../utils/api";

const LoginScreen = ({navigation}) =>{
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
        .then((res) => {
            console.log(res)
            setUsers(res)
        })
    })

    return (
        <View style={styles.container}>
            <Text>Login</Text>
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
        backgroundColor:'#8fcbbc'
    }
})
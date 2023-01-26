import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";

const LoginScreen = ({navigation}) =>{
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
            title = "Click Here"
            onPress={()=>navigation.navigate("FarmsScreen")}
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
        backgroundColor:'#8fcbbc'
    }
})
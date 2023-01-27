import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import LoginScreen from "./LoginScreen";

const SettingScreen = ({navigation}) =>{
    return (
        <View style={styles.container}>
            {/* <Text>Sign Out</Text> */}
            <Button
            title = "Sign Out"
            onPress={()=>navigation.navigate(LoginScreen)}
            />
        </View>
    )
}

export default SettingScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyFarm = ({navigation}) =>{
    return (
        <View style={styles.container}>
            <Text>My Farm</Text>
        </View>
    )
}

export default MyFarm

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})
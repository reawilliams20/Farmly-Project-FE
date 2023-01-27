import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SingleFarm = () =>{
    return (
        <View style={styles.container}>
            <Text>Test</Text>
        </View>

    )
}

export default SingleFarm

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})
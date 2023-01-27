import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const FarmScreen = ({ navigation: { goBack } }) =>{
    return (
        <View style={styles.container}>
             <Button onPress={() => goBack()} title="Go back from ProfileScreen" />
            <Text>Test</Text>
        </View>

    )
}

export default FarmScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})
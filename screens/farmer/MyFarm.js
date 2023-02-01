import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getFarms } from "../../utils/api";
import { UserContext } from "../../navigation/user";

const MyFarm = ({navigation}) =>{
    const {user, isFirstLaunch} = useContext(UserContext)
    const [farm, setFarm ] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    let myFarm = []
    useEffect(() => {
        getFarms()
        .then((response) => {
            const listOfFarms = [...response]
            return myFarm = listOfFarms.filter((farm) => {
                return farm.username === user.email
            }) 
        })
        .then(() => {
                setFarm(myFarm)
                setIsLoading(false)
        })
    }, [])
    if(isFirstLaunch == true){
        return (
            <View style={styles.container}>
                <Text>Welcome to Farmly!</Text>
            </View>
        )
    }
    else {
        return isLoading ? (
            <View style={styles.container}>
                <Text> Loading... </Text>
            </View>
            ) :
            (
                <View style={styles.container}>
                    <Text>{farm[0].name}</Text>
                    <Text>{farm[0].address.street}</Text>
                    <Text>{farm[0].address.town}</Text>
                    <Text>{farm[0].address.county}</Text>
                    <Text>{farm[0].address.postcode}</Text>
                    <Text>{farm[0].address.country}</Text>
                    <Text>{farm[0].description}</Text>
                    <Image source={{uri:`${farm[0].profile_pic}`}}
                    style={{width: 400, height: 200}}/>
                </View>
            )
    }
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
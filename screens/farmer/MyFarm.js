import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { getFarms, patchFarmById } from "../../utils/api";
import { UserContext } from "../../navigation/user";


const MyFarm = ({navigation}) =>{
    const {user, isFirstLaunch} = useContext(UserContext)
    const [farm, setFarm ] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isEditable, setIsEditable] = useState(false);

    const [name, setName] = useState(farm.name)
    const [description, setDescription] = useState(farm.description)


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


    const editFarm = (e) => {
        if (e.target.textContent === "Cancel")
        {
            navigation.navigate("MyFarm")
        }
        setIsEditable(!isEditable)
    }

        const updateFarm = () => {
            const patch = {
                "name": name,
                "description": description
            }
            patchFarmById(farm[0].farm_id, patch)
            .then(() => {
                alert('Saved!')
                setIsEditable(!isEditable)
            }).catch((err) => {
                alert("something went wrong try again")
            })
            
    }

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
      )
      :
      (
        <View style={styles.container}>
                <Image source={{uri:`${farm[0].profile_pic}`}}
                style={{width: 400, height: 200}}/>
                <TextInput style={styles.input} placeholder={farm.name} editable={isEditable} onChangeText={name => setName(name)}>{farm[0].name}</TextInput>
                <Text>{farm[0].address.street}</Text>
                <Text>{farm[0].address.town}</Text>
                <Text>{farm[0].address.county}</Text>
                <Text>{farm[0].address.postcode}</Text>
                <Text>{farm[0].address.country}</Text>
                <TextInput multiline={true} numberOfLines={3} style={styles.input} placeholder={farm.description} editable={isEditable} onChangeText={description => setDescription(description)}>{farm[0].description}</TextInput>
                <Button title={isEditable ? 'Cancel': 'Edit'} onPress={(e) => editFarm(e)} />
                    {isEditable ? (<Button title="Save" onPress={updateFarm} />) :null }
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
    },
    input:{
        margin: 10,
        borderBottomColor: "solid grey",
        borderBottomWidth: 0.5,
        padding: 10,
    }
})
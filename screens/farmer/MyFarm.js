import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button, Pressable } from "react-native";
import { getFarms, patchFarmById, getUsers, postFarm  } from "../../utils/api";

import { UserContext } from "../../navigation/user";
import { FlatList, ScrollView } from "react-native-web";

const MyFarm = ({navigation}) => {
    const {user, isFirstLaunch} = useContext(UserContext)
    const [farm, setFarm ] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [shouldShow, setShouldShow] = useState(false);
    const [newFarmName, setNewFarmName] = useState("");
    const [profile_pic, setProfilePic] = useState("");
    const [description, setDescription] = useState("");
    const [street, setStreet] = useState("")
    const [town, setTown] = useState('')
    const [county, setCounty] = useState('')
    const [postcode, setPostcode] = useState('')
    const [country, setCountry] = useState('')
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState(farm.name)
    const [newDescription, setNewDescription] = useState(farm.description)
    const [farmAdded, setFarmAdded] = useState(false)


  if (isFirstLaunch == true) {
    useEffect(() => {
      getFarms()
      .then((response) => {
        setFarm(response);
        setIsLoading(false);
      });
    }, [farm]);

    const addFarm = () => {
      setShouldShow(!shouldShow);
      const newFarm = {
        name: newFarmName,
        description: description,
        address: {street:street, town: town, county: county, postcode: postcode, country: country},
        profile_pic: profile_pic,
        user_id: 0,
        username: user.email,
        distance_from_location: 0,
      };

    setFarm(newFarm)

    postFarm(newFarm).then(() => {
        setFarmAdded(true)
    })
    .catch((err) => {
      alert("sorry something went wrong, please try again later.");
      setFarm((newFarm) => {
        const currFarm = [...newFarm]
        currFarm.pop()
        return currFarm
      })
    });
    };

    return farmAdded===false ? (
      <View style={styles.container}>
        <Pressable
          style={styles.add}
          onPress={() => setShouldShow(!shouldShow)}
        >
          <Text style={styles.content}>+</Text>
        </Pressable>
        {shouldShow ? (
          <View>
            <Text>Farm Name:</Text>
            <TextInput
              placeholder="Enter farm name"
              onChangeText={(newFarmName) => setNewFarmName(newFarmName)}
            />

            <Text>Street:</Text>
            <TextInput
              placeholder="Enter street"
              onChangeText={(street) => setStreet(street)}
            />

            <Text>Town:</Text>
            <TextInput
              placeholder="Enter town"
              onChangeText={(town) => setTown(town)}
            />

            <Text>County:</Text>
            <TextInput
              placeholder="Enter county"
              onChangeText={(county) => setCounty(county)}
            />

            <Text>Postcode:</Text>
            <TextInput
              placeholder="Enter postcode"
              onChangeText={(postcode) => setPostcode(postcode)}
            />

            <Text>Country:</Text>
            <TextInput
              placeholder="Enter country"
              onChangeText={(country) => setCountry(country)}
            />


            <Text>Description:</Text>
            <TextInput
              placeholder="Provide a description of your farm"
              onChangeText={(description) => setDescription(description)}
            />

            <Text>Farm image:</Text>
            <TextInput
              placeholder="Upload an image"
              onChangeText={(profile_pic) => setProfilePic(profile_pic)}
            />


            <Pressable style={styles.add} onPress={() => addFarm()}>
              <Text>Add Farm</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    ) :(
        <View style={styles.container}>
        <Image
          source={{ uri: `${farm[0].profile_pic}` }}
          style={{ width: 400, height: 200 }}
        />
        <Text>{farm[0].name}</Text>
        <Text>{farm[0].address.street}</Text>
        <Text>{farm[0].address.town}</Text>
        <Text>{farm[0].address.county}</Text>
        <Text>{farm[0].address.postcode}</Text>
        <Text>{farm[0].address.country}</Text>
        <Text>{farm[0].description}</Text>
      </View>
    )
    } else {
    let myFarm = [];
    useEffect(() => {
      getFarms()
        .then((response) => {
          const listOfFarms = [...response];
          return (myFarm = listOfFarms.filter((farm) => {
            return farm.username === user.email;
          }));
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
                "description": newDescription
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
                <TextInput multiline={true} numberOfLines={3} style={styles.input} placeholder={farm.description} editable={isEditable} onChangeText={description => setNewDescription(description)}>{farm[0].description}</TextInput>
                <Button title={isEditable ? 'Cancel': 'Edit'} onPress={(e) => editFarm(e)} />
                    {isEditable ? (<Button title="Save" onPress={updateFarm} />) :null }
          </View>
       )

    }
}
}

export default MyFarm;

const styles= StyleSheet.create({
    container:{
        padding: 60,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#B6EBA6'
    },
    input:{
        margin: 10,
        borderBottomColor: "solid grey",
        borderBottomWidth: 0.5,
        padding: 10,
    },
    add: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
})



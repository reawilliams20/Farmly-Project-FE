import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { getFarms, getUsers, postFarm } from "../../utils/api";
import { UserContext } from "../../navigation/user";
import { TextInput } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-web";

const MyFarm = () => {
  const { user, isFirstLaunch } = useContext(UserContext);
  const [farm, setFarm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("")
  const [town, setTown] = useState('')
  const [county, setCounty] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('')



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

    setFarm((farm)=>{
        const newFarmList = [...farm]
        newFarmList.push(newFarm)
        return newFarmList
    })
  

    postFarm(newFarm)
    .catch((err) => {
      alert("sorry something went wrong, please try again later.");
    //   setFarm((farm)=>{
    //     const newFarmList = [...farm]
    //     newFarmList.pop()
    //     return newFarmList
    //   })
    });
    console.log(farm,"64")

    
    

    };
    return (
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
        {/* (
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
    ); */}
      </View>
    );
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
          setFarm(myFarm);
          setIsLoading(false);
        });
    }, []);
    return isLoading ? (
      <View style={styles.container}>
        <Text> Loading... </Text>
      </View>
    ) : (
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
    );
  }
};

export default MyFarm;

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
  add: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});

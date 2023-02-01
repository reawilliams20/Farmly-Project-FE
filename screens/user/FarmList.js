import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { getFarms, patchFarmDistanceById } from "../../utils/api";
import * as Location from 'expo-location';
import { distanceCalculator } from "../../utils/utils";
import { shadow } from "react-native-paper";

const FarmList = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [currentLat, setCurrentLat] = useState(null)
  const [currentLon, setCurrentLon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    (async () => {
      let {status} = Location.requestForegroundPermissionsAsync()
      if (status === "granted"){
        console.log("yes")
      } else {
        console.log("no")
      }

      let location = await Location.getCurrentPositionAsync({})
      setCurrentLocation(location)
      setCurrentLat(location.coords.latitude)
      setCurrentLon(location.coords.longitude)
      setLoading(false)
    })()
  
    getFarms()
    .then((response) => {
      setFarms(response)
    })
    
  }, []);

  if (farms.length > 0) {
    if (currentLat && currentLon !== null) {
      farms.forEach((farm) => {
        distanceCalculator(currentLat, currentLon, farm.address.postcode)
        .then((res) => {
          patchFarmDistanceById(farm.farm_id, res)
        })
      })
    }
  } 

  if (loading) {
    return (
      <View>
        <Text>Calculating your closest farms...</Text>
      </View>
    )
  }

  return (
      <View style={styles.container}>
        <FlatList
          data={farms}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SingleFarm", {farm_id: item.farm_id})}>
                  <Image
                  style={styles.cardImage}
                  source={{uri: item.profile_pic}}
                  />
                <Text 
                style={styles.baseText} >
                  <Text
                  style={styles.titleText}>
                    {item.name}
                  </Text>
                  {`\n`}
                  {item.distance_from_location} km away
                </Text>
              </TouchableOpacity>
            );
          }}
        />
    </View>
  );
};

export default FarmList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    margin: 24,
    marginBottom: 0,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  cardImage: {
    width: 327,
    height: 150,
    overflow: "hidden",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  baseText: {
    fontSize: 16,
    textAlign: "center",
    padding: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8
  },
});
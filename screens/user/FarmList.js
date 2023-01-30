import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { Card } from "react-native-elements";
import { getFarms, getLocationData, patchFarmDistanceById } from "../../utils/api";
import * as Location from 'expo-location';
import { distanceCalculator } from "../../utils/utils";

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
      console.log(currentLat, currentLon)
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
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>
      {JSON.stringify(currentLocation)}
      </Text>
      <FlatList
        data={farms}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text onPress={() => navigation.navigate("SingleFarm")}>
                {item.name}
                {`\n`}
                {item.address.postcode}
                {`\n`}
                {item.distance_from_location} km away
              </Text>
            </Card>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});

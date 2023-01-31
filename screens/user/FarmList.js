import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image} from "react-native";
import { Card } from "react-native-elements";
import { getFarms, patchFarmDistanceById } from "../../utils/api";
import * as Location from 'expo-location';
import { distanceCalculator } from "../../utils/utils";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";

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
            <Card style={styles.card}>
              <Text 
              onPress={() => navigation.navigate("SingleFarm")}
              style={styles.baseText} >
                <Text
                style={styles.titleText}>
                  {item.name}
                </Text>
                {`\n`}
                {item.distance_from_location} km away
              </Text>
               <Image
                style={styles.Logo}
                source={{uri: item.profile_pic}}
                />
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
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  Logo: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
  baseText: {
    fontSize: 16,
    textAlign: "left"
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

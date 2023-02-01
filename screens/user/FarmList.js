import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { getFarms, patchFarmDistanceById } from "../../utils/api";
import * as Location from 'expo-location';
import { distanceCalculator } from "../../utils/utils";

const FarmList = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [permission, setPermission] = useState(false)

  useEffect(() => {

    const getPermissions = async () => {
      setLoading(true)
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setLoading(false)
        setPermission(false)
      } else {
        setPermission(true)
        let location = await Location.getCurrentPositionAsync({})
        setCurrentLocation(location)
      }
      return status
    }

    const getFarmsDistance = async () => {
      getFarms()
      .then((response) => {
        setFarms(response)
      })
      .then(() => {
          farms.forEach((farm) => {
              distanceCalculator(currentLocation.coords.latitude, currentLocation.coords.longitude, farm.address.postcode)
              .then((res) => {
                patchFarmDistanceById(farm.farm_id, res)
              })
          })
      })        
    }

    getPermissions()
    .then(() => {
      getFarmsDistance()
      setLoading(false)
    })
     
  }, []);


  if (loading) {
    return (
      <View>
        <Text>Calculating your closest farms...</Text>
      </View>
    )
  }

  if (!permission) {
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
              </Text>
            </TouchableOpacity>
          );
        }}
      />
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
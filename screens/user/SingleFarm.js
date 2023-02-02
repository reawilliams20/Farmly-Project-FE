import React from "react";
import { View, Text, StyleSheet, Image, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getFarmById, getProduce } from "../../utils/api";
import { FlatList } from "react-native";

const SingleFarm = ({ route, navigation }) => {
  const { farm_id } = route.params;
  const [farm, setFarm] = useState([]);
  const [produce, setProduce] = useState([]);

  useEffect(() => {
    getFarmById(farm_id).then((response) => {
      setFarm(response);
    });
    getProduce().then((response) => {
      setProduce(response);
    });
  }, []);
  const produceInStock = produce.filter((item) => {
    return item.farm_id === farm_id;
  });

  if (farm.length !== 0) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* Back button at the top of the screen */}
          <View style={styles.backButton}>
            <Button
              title="Back"
              onPress={() => {navigation.navigate("FarmList");}}>
            </Button>
          </View>

          {/* Farm info card */}
          <View style= {styles.farmInfo}>
            <Image source={{ uri: `${farm.profile_pic}` }} style={styles.cardImage}/>
            <Text style={styles.titleText}>
              {farm.name}
            </Text>
            <View style={styles.baseText}>
              <Text style={styles.subTitle}>
                Address
              </Text>
              <Text style={styles.address}>
                {farm.address.street},
                {`\n`}
                {farm.address.town},
                {`\n`}
                {farm.address.county},
                {`\n`}
                {farm.address.postcode},
                {`\n`}
                {farm.address.country}
                {`\n`}
              </Text>
              <Text style={styles.subTitle}>
                Description
              </Text>
              <Text style={styles.description}>
                {farm.description}
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                title="Message the farm"
                onPress={() =>
                  navigation.navigate("UserChat", {
                    farm_id: farm_id,
                    farm_name: farm.name,
                    farm_username : farm.username
                  })
                }
              />
            </View>
          </View>
              
          {/* List of Produce */}
          {produceInStock.map((item) => {
            return (
              <View style={styles.produceCard}>
                <View style={styles.produceWriting}>
                  <Text style={styles.produceSubTitle}>
                    {item.name}:
                  </Text>
                  <Text>
                    Price: £{item.price}/per {item.unit}
                    {`\n`} 
                  </Text>
                  <Text>
                    Description:
                    {`\n`} 
                    {item.description}
                  </Text>
                </View>
                <Image source={{ uri: `${item.produce_pic}` }} style={styles.produceImage}/>
              </View>
            );
          })}
          
        </ScrollView>
      </View>
    );
  }
};

export default SingleFarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
  button: {
    marginBottom: 8
  },
  backButton: {
    margin: 24,
  },
  baseText: {
    fontSize: 16,
    textAlign: "center",
    padding: 4,
  },
  address: {
    padding: 4,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },
  description: {
    padding: 4,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 8,
    textAlign: "center",
  },
  farmInfo: {
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    margin: 24,
    marginTop: 0,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardImage: {
    width: 327,
    height: 150,
    overflow: "hidden",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  produceCard: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    margin: 24,
    marginBottom: 12,
    marginTop: 12,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  produceWriting: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    padding: 8,
    marginLeft: 8
  },
  produceImage: {
    width: 100, 
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    margin: 4
  },
  produceSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    paddingBottom: 8
  },
});

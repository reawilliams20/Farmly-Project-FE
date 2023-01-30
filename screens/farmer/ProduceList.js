import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, TextInput, Pressable } from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import { Card } from "react-native-elements";
import { deleteProduce, getFarms, getProduce, postProduce } from "../../utils/api";
import { UserContext } from "../../navigation/user";

const ProduceList = ({ navigation }) => {
  const {user} = useContext(UserContext)
  const [farms, setFarms] = useState([])
  const [produce, setProduce] = useState([]);
  const [shouldShow, setShouldShow] = useState(false)
  const [category, setCategory] = useState('fruits');
  const [name, setName] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [description, setDescription] = useState('')

  const categories = [
    { label: 'fruits', value: 'fruits' },
    { label: 'vegetables', value: 'vegetables' },
    { label: 'condiments', value: 'condiments' }
  ]; 

  useEffect(() => {
    getProduce().then((response) => {
      setProduce(response);
    });
    getFarms().then((response) => {
      setFarms(response)
    })
  }, []);

  const listOfFarms = [...farms]

  const currFarm = listOfFarms.filter((farm) => {
    return farm.username === user.email
  })

  const listOfProduce = [...produce]
  const myProduce = listOfProduce.filter((produce) => {
    return user.email === produce.username
  })

  const addProduce = () => {
    setShouldShow(!shouldShow)
    const newProduce = {
        "name": name,
        "category": category,
        "stock": stock,
        "price": price,
        "unit": unit,
        "description": description,
        "farm_id": currFarm[0].farm_id,
        "username": user.email
    }
    console.log(newProduce)
    console.log(currFarm)

    //optimistic rendering:
    setProduce((produceList) => {
      const newProduceList = [...produceList]
      newProduceList.push(newProduce)
      return newProduceList
    })
    postProduce(newProduce)
    .catch((err) => {
      alert("sorry something went wrong, please try again later.")
      setProduce((produceList) => {
        const newProduceList = [...produceList]
        newProduceList.pop()
        return newProduceList
      })
    })
  }

  const handleDelete = (id) => {
    const newProduceList = [...produce]
    setProduce(() => {
      return newProduceList.filter((produce) => {
        return produce.produce_id !== id
      })
    })
    deleteProduce(id)
    .catch((err) => {
      alert("sorry something went wrong, please try again later.")
      setProduce(newProduceList)
    })
  }

  return (
    <View style={styles.container}>
      <Button
            title = " + "
            onPress={() => setShouldShow(!shouldShow)}
      />

      {shouldShow ?
        ( <View>
          <Text>Name:</Text>
          <TextInput 
          placeholder="e.g peas" 
          onChangeText={name => setName(name)}/>
          
          <Text>Stock:</Text>
          <TextInput
          placeholder="e.g 10"
          onChangeText={stock => setStock(stock)}                                     
          />

          <Text>Price(£):</Text>
          <TextInput
          placeholder="e.g 2.50" 
          onChangeText={price => setPrice(price)}
          />

          <Text>Unit:</Text>
          <TextInput
          placeholder="e.g 300g" 
          onChangeText={unit => setUnit(unit)}
          />  

          <Text>Description:</Text>
          <TextInput
          placeholder="description"
          onChangeText={description => setDescription(description)}
          />
          <Text>Category:</Text>
          <RadioForm
          radio_props={categories}
          initial={0}
          onPress={(value) => {
            setCategory(value);
          }}
          />

          <Button
          title = "Add Produce"
          onPress={()=> addProduce()}
          />
        </View>)
      : null }


      <FlatList
        data={myProduce}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text>{item.name}</Text>
              <Pressable style={styles.button} onPress={()=> handleDelete(item.produce_id)}>
              <Text style={styles.deltext}>🗑️</Text>               
              </Pressable>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ProduceList;

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
  button:{
    backgroundColor: "none",
  },
  deltext: {
    textAlign: "center",
    margin: 0,
    padding: 0
  }
});
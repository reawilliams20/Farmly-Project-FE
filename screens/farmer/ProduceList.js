import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, TextInput, Pressable, ScrollView, Image } from "react-native";
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
  const [pic, setPic] = useState('')

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
  }, [produce]);

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
        "username": user.email,
        "produce_pic": pic
    }

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
      <Pressable style={styles.add} onPress={()=> setShouldShow(!shouldShow)}>
      <Text style={styles.content}>+</Text>
      </Pressable>

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

          <Text>Image:</Text>
          <TextInput
          placeholder="https://www.image.com"
          onChangeText={pic => setPic(pic)}
          />

          <Text>Category:</Text>
          <RadioForm
          radio_props={categories}
          initial={0}
          onPress={(value) => {
            setCategory(value);
          }}
          />

          <Pressable style={styles.add} onPress={()=> addProduce()}>
          <Text>Add Produce</Text>
          </Pressable>

        </View>)
      : null }

      <ScrollView>
        <View>
      <FlatList
        data={myProduce}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text style={styles.textName} onPress={() => navigation.navigate("SingleProduce", {produce_id: item.produce_id})}>{item.name}</Text>
              <Text style={styles.text}>Stock: {item.stock}</Text>
              <Image style={styles.pic} source={{uri:`${item.produce_pic}`}}/>
              <Pressable style={styles.button} onPress={()=> handleDelete(item.produce_id)}>
              <Text style={styles.deltext}>🗑️</Text>               
              </Pressable>
            </Card>
          );
        }}
      />
      </View>
      </ScrollView>
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
    marginTop: 20,
    padding: 0,
  },
  text: {
    textAlign: "center"
  },
  textName: {
    textAlign: "center",
    fontWeight: "bold"
  },
  add:{
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  pic:{
    alignSelf: "center",
    width:100,
    height: 60
}
});
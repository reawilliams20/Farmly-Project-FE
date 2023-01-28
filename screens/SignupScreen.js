import React, {useState} from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {Picker} from "@react-native-picker/picker";


const SignUpScreen = ({navigation}) =>{
    const auth = getAuth()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectType, setSelectedType] = useState(''); 
    const [postcode, setPostcode] = useState('')
    const handleSignUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: avatar? avatar: "https://example.com/jane-q-user/profile.jpg",
            })
        })
    }


    return (
        <ScrollView>
        <View style={styles.container}>
            <Text>Sign Up</Text>
            <Input
                placeholder='Enter your name'
                label='Name'
                value={name}
                onChangeText={text => setName(text)} 
                required
            />
            <Input
                placeholder='Enter email'
                label='Email'
                value={email}
                onChangeText={text => setEmail(text)} 
                required
            />
            <Input
                placeholder='Enter password '
                label='Password'
                value={password} 
                onChangeText={text => setPassword(text)}
                secureTextEntry 
                required
            />
             <Input
                placeholder='Confirm password '
                label='Confrim password'
                value={confirmPassword} 
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry 
                required
            />
             <Input
                placeholder='Enter your image url'
                label='Profile Picture'
                value = {avatar}
                onChangeText={text => setAvatar(text)} 
                required
            />
             <Input
                placeholder='Enter your postcode'
                label='Postcode'
                value = {postcode}
                onChangeText={text => setPostcode(text)} 
                required
            />
            </View>

            <View style={styles.picker}>
            <Text style={styles.container}>Select a type</Text>
            <Picker 
            placeholder = {{label:"Select a type", value: null}}
            selectedValue = {selectType}
            onValueChange={(value)=> setSelectedType(value)} >
            <Picker.Item label= "I am a customer"  value= "customer" />
            <Picker.Item label= "I am a farmer"  value= "farmer" />
            </Picker>
            </View>
            <View>
            <Button
            title = "Register"
            onPress={handleSignUp}
            />
        </View>
        </ScrollView>
        
    )
}

export default SignUpScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    picker :{
        flex:1,
        justifyContent:'center',
    }
})
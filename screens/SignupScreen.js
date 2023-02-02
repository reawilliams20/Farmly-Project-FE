import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView,Pressable } from "react-native";
import { Button,Input } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { auth } from "../firebase";
import { UserContext } from "../navigation/user";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { postUser } from "../utils/api";
import { color } from "react-native-elements/dist/helpers";

const SignUpScreen = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [postcode, setPostcode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let { type, setType, isFirstLaunch, setIsFirstLaunch, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

  let currSelectType = "";
  let currPostcode = "";

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Confirm password is not matched!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoggedIn(true)
        const user = userCredential.user;
        setIsFirstLaunch(true);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: avatar
            ? avatar
            : "https://www.vecteezy.com/vector-art/1840618-picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector",
        });

      })
      .then(() => {
        const newUser = {
          "username":name,
          "email":email,
          "postcode":postcode,
          "type":type,
          "profile_pic":avatar
          ? avatar
          : "https://www.vecteezy.com/vector-art/1840618-picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector",
          "password":password
        }
        postUser(newUser)
      })
      .catch((error) => {
        alert(`Something went wrong with sign up: ${error} `);
      });
  };

  return (
     <ScrollView>
    
      <View style={styles.container}>
      {/* <View> */}
        <Input
          style={styles.inputContainer}   
          placeholder="Enter your name"
          label="Name"
          value={name} 
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setName(text)}
          enablesReturnKeyAutomatically
          required
        />
        <Input
          style={styles.inputContainer}   
          placeholder="Enter email"
          label="Email"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
          enablesReturnKeyAutomatically
          required
        />
          <Input
          style={styles.inputContainer}                 
          placeholder="Enter password "
          label="Password"
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
          required
          />
          <Pressable onPress={handlePasswordVisibility} style={styles.icon}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
          </Pressable>

        
        <Input
          style={styles.inputContainer}   
          placeholder="Confirm password "
          label="Confrim password"
          value={confirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
          required
        />
        <Input
          style={styles.inputContainer}   
          placeholder="Enter your image url"
          label="Profile Picture"
          value={avatar}
          onChangeText={(text) => setAvatar(text)}
          enablesReturnKeyAutomatically
          required
        />
        <Input
          style={styles.inputContainer}   
          placeholder="Enter your postcode"
          label="Postcode"
          value={postcode}
          autoCapitalize ="characters"
          onChangeText={(postcode) => setPostcode(postcode)}
          enablesReturnKeyAutomatically
          required
        />

        <View>
          <Text style={styles.typeText}>Select a type</Text>
          <Picker style={styles.picker}
            placeholder={{ label: "Select a type", value: null }}
            selectedValue={type}
            onValueChange={(value) => setType(value)}
            required
          >
          <Picker.Item label="I am a customer" value="customer" />
          <Picker.Item label="I am a farmer" value="farmer" />
          </Picker>
          </View>
        

        <View style={styles.button}>
          <Button
            title="Register"
            onPress={() => handleSignUp(currPostcode, currSelectType)}
          />
        </View>
      

      </View >

    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  picker: {
    height: 80,
    width: 300,
    marginTop: -48
  },
  inputContainer: {
    margin: 10,
    padding: 10,
  },
  icon: {
    marginTop: -65,
    marginLeft: 330,
    marginBottom: 45
  },
  inputField: {
    fontSize: 22,
    width: '80%'
  },
  button: {
    marginTop: 100,
    marginBottom: 20
  },
  typeText: {
    marginLeft: -24,
    fontSize: 20
  }
});

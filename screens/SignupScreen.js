import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView,Pressable } from "react-native";
import { Button,Input } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { auth } from "../firebase";
import { UserContext } from "../navigation/user";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignUpScreen = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [postcode, setPostcode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let { type, setType, isFirstLaunch, setIsFirstLaunch } =
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
        const user = userCredential.user;
        setIsFirstLaunch(true);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: avatar
            ? avatar
            : "https://www.vecteezy.com/vector-art/1840618-picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector",
        });
      })

      .catch((error) => {
        alert(`Something went wrong with sign up: ${error} `);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
        <View  style={styles.inputContainer}>
        <Input
        style={styles.inputField}                 
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
        <Pressable onPress={handlePasswordVisibility}
        >
        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
        </ View>
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
      </View >
      <View style={styles.picker}>
        <Text>Select a type</Text>
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
      <View>
        <Button
          title="Register"
          onPress={() => handleSignUp(currPostcode, currSelectType)}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  picker: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 4,
    // borderColor: '#d7d7d7'
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '90%'
  }
});

// additional features -->  hide and show password

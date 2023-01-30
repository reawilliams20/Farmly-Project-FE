import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignUpScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";


export const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
     <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignUpScreen} />
        </Stack.Navigator>
  )
       

}

export default AuthStack;
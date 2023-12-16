import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "./Login.js"

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            animationEnabled: true,
            headerShown: false,
          }} >
          <Stack.Screen name='Login' component={LoginScreen}/>
        </Stack.Navigator> 
    )
}

export default AuthStack
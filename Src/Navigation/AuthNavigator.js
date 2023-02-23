// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login'
import Signup from '../Signup';
import BottomTab from './BottomTab';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator  independent={true} initialRouteName={Login}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Bills" component={BottomTab} options={{headerShown:false}} />

    </Stack.Navigator>
  );
}

export default App;
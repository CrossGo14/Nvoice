// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import Login from '../Login';
import FoodItems from '../FoodItems';
import AddFood from '../AddFood';

const Stack = createNativeStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator  independent={true} initialRouteName={Login}>
        <Stack.Screen name="FoodItems" component={FoodItems} />
        <Stack.Screen name="AddFood" component={AddFood} />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
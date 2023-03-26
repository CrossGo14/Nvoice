// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
// import Tableinfo from '../Tableinfo';
import Table from '../Table';
import Login from '../Login';
import Tablefood from '../Tablefood';
import Cart from '../Cart';

const Stack = createNativeStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator  independent={true} initialRouteName={Login}>
        <Stack.Screen name="Table" component={Table} />
        {/* <Stack.Screen name="Tableinfo" component={Tableinfo} /> */}
        <Stack.Screen name="Tablefood" component={Tablefood} />
        <Stack.Screen name="Cart" component={Cart} />


    </Stack.Navigator>
  );
}

export default ProfileNavigator;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Table from '../Table';
import Bills from '../Bills';
import FoodItems from '../FoodItems';
import Profile from '../Profile';
import Icon, { FeatherIcon } from 'react-native-vector-icons/Feather';
import ProfileNavigator from './ProfileNavigator';
import TableNavigator from './TableNavigator'
import FoodNavigator from './FoodNavigator'


const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bills" component={Bills} 
      options={{tabBarIcon: ({focused})=>{
    return(
    <Icon name='book' size={20}></Icon>
    )
    }}}
/> 
      <Tab.Screen name="Food" component={FoodNavigator}
       options={{tabBarIcon: ({focused})=>{
        return(
        <Icon name='home' size={20}></Icon>
        )
        }}} />

      <Tab.Screen name="Table" component={TableNavigator} 
       options={{tabBarIcon: ({focused})=>{
        return(
        <Icon name='tablet' size={20}></Icon>
        )
        }}}/>

      <Tab.Screen name="Profile" component={ProfileNavigator}
       options={{tabBarIcon: ({focused})=>{
        return(
        <Icon name='user' size={20}></Icon>
        )
        }}} />


     
    </Tab.Navigator>
  );
}

export default BottomTab;
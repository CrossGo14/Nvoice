//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon, { FeatherIcon } from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AddFood from './AddFood';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";



// create a component
const FoodItems = () => {
    const Navigation = useNavigation();
    const Stack=createNativeStackNavigator();


    const press = ()=>{
        Navigation.navigate("AddFood");
    }

    return (
        <View style={styles.container}>
        <View style={styles.floatingbutton} >
        <TouchableOpacity onPress={press}>
            <Icon   name='plus-square' size={34} ></Icon>
        </TouchableOpacity>
        </View>
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    plus:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        width:scale(630),
        height:verticalScale(1050) 

    },
    floatingbutton:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        paddingLeft:scale(250),
        paddingTop:verticalScale(450)
    },
});

//make this component available to the app
export default FoodItems;

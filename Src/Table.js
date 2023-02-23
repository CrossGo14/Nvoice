//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Button,Image} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon, { FeatherIcon } from 'react-native-vector-icons/Feather';
import Tableinfo from './Tableinfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";


// create a component
const Table= () => {
    
    const Navigation = useNavigation();
    const Stack=createNativeStackNavigator();

    const press = ()=>{
        Navigation.navigate("Tableinfo");
    }


    return (
        <View style={styles.container}>

            <View>
            <TouchableOpacity style={styles.plus} onPress={press}>
                <Image 
                style={styles.floatingbutton}
                source={{uri:'https://img.icons8.com/plasticine/512/add.png'}} />

            </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal:scale(10)
    },
    box:{
        width:scale(150),
        height:verticalScale(150),
        borderRadius:20,
        backgroundColor:'light-grey',
        marginTop:verticalScale(20),
    },
    plus:{
        justifyContent:'center',
        alignItems:'center',

        position:'absolute',
        width:scale(600),
        height:verticalScale(1100) 

    },
    floatingbutton:{
        resizeMode:'contain',
        width:50,
        height:50
    }
});

//make this component available to the app
export default Table
;

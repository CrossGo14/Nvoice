//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from './Background';

// create a component
const Signup
 = () => {
    return (
        <Background>
        <View style={styles.container}>
            <Text>Sign Up</Text>
        </View>
        </Background>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Signup
;

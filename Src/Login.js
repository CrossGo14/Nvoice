//import liraries
import React, { Component } from 'react';
import { View, Text,TouchableOpacity} from 'react-native';
import Background from './Background';
import { brown } from './Constants';
import Btn from './Btn';
import Field from './Fields';
import {useNavigation} from '@react-navigation/native';
import Bills from './Bills';


// create a component
const Login = (props) => {
  const navigation = useNavigation();


    return (
        <Background>
        <View style={{alignItems: 'center', width: 460}}>
          <Text
            style={{
              color: 'white',
              fontSize: 64,
              fontWeight: 'bold',
              marginVertical: 25,
            }}>
            Login
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              height: 700,
              width: 460,
              borderTopLeftRadius: 130,
              paddingTop: 100,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 40, color: brown, fontWeight: 'bold'}}> Welcome Back </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
              Login to your account </Text>
            <Field
              placeholder="Email / Username"
              keyboardType={'email-address'}
            />
            <Field placeholder="Password" secureTextEntry={true} />
            <View
              style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
              <Text style={{color: brown, fontWeight: 'bold', fontSize: 16}}>
                Forgot Password ?
              </Text>
            </View>

            <Btn bgcolor={brown} txtcolor='white' btnlabel="Login" Press={()=>navigation.navigate(Bills) }/>

            <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
              <Text style={{ color: brown, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    );
};



//make this component available to the app
export default Login;

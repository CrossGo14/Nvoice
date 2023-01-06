import * as React from 'react';
import { View,SafeAreaView, Text ,StyleSheet} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { brown } from './Constants';


const Home=(props)=>{
    return(
        <Background>
            <View style={{marginHorizontal: 40, marginVertical: 500 }}>

            <Btn bgcolor={brown} txtcolor="white" btnlabel="Login" Press={()=> props.navigation.navigate("Login")} />
            <Btn bgcolor='white' txtcolor="{brown}" btnlabel="Sign Up" Press={()=> props.navigation.navigate("Signup")}/>

            </View>

        </Background>
    
    )

}

export default Home;




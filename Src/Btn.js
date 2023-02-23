import * as React from 'react';
import { TouchableOpacity,Text} from 'react-native';

export default function Btn({bgcolor,btnlabel,txtcolor,Press}){

    return(
        <TouchableOpacity
        onPress={Press} 
        style={{
          backgroundColor:bgcolor,
          borderRadius:100,
          alignItems:'center',
          width:350,
          paddingVertical:5,
          marginVertical:10,

          }}>
        <Text style={{color:txtcolor,fontSize:25,fontWeight:'bold'}}>{btnlabel}</Text>
        </TouchableOpacity>  
      )
    }








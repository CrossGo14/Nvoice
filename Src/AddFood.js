import { View, Text,TextInput,StyleSheet,TouchableOpacity ,Button, Keyboard} from 'react-native'
import React, {useEffect, useState} from 'react';
import {firebase} from './config';

export default function AddFood() {

    const fooditem=firebase.firestore().collection('Food Items');


const[food,setfood]=useState('');
const[price,setprice]=useState('');

const addfiled=()=>{

    const data={
        ItemName:food,
        Price:price
    };
    fooditem
    .add(data)
    .then(()=>{
        setfood(''),
        setprice('');
        Keyboard.dismiss();
    })
    .catch((error)=>{
        alert(error)

    })
    alert("Food Item Added")
}
  return (
    <View>
        <TextInput
        placeholder="Enter Food Item"
        style={styles.input}
        value={food}
        onChangeText={txt => setfood(txt)}
      />
      <TextInput
        placeholder="Enter Price OF the FOod"
        style={styles.input}
        value={price}
        onChangeText={txt => setprice(txt)}
      />
       <TouchableOpacity
        style={styles.addBtn}
        onPress={addfiled}
        >
        <Text style={styles.btnText}>Save Food Item</Text>
      </TouchableOpacity>



    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.3,
        alignSelf: 'center',
        paddingLeft: 20,
        marginTop: 100,
      },
      btnText: {
        color: '#fff',
        fontSize: 18,
      },
      addBtn: {
        backgroundColor: 'purple',
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'center',
      },

});


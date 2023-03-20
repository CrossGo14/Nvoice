//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon, { FeatherIcon } from "react-native-vector-icons/Feather";
import {firebase} from './config';


// create a component
const Tableinfo = ({ visible, onClose, onSubmit, note, isEdit })=> {
  const [tableno, settableno] = useState('');


  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const table=firebase.firestore().collection('Table');


  const addtable=()=>{
    const data={
        Tableno:tableno,
    };
    table
    .add(data)
    .then(()=>{
        settableno(''),
        Keyboard.dismiss();
    })
    .catch((error)=>{
        alert(error)

    })
    alert("Table Added")
}
 
  return (
    <SafeAreaView>
      <View style={styles.action}>
        <Text style={{ fontSize: 17 }}>Enter Your Table Number:</Text>
        <TextInput
          placeholder="Enter Number"
          value={tableno}
          onChangeText={(text) => settableno(text)}
          style={styles.textinput}
        />
        <TouchableOpacity onPress={addtable}>
          <Text style={styles.tick}>✓</Text>
        </TouchableOpacity>
        <Icon name="x" size='17'></Icon>
      </View>
    </SafeAreaView>


  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    fontSize: 30,
  },
  textinput: {
    borderBottomWidth: 0.5,
    fontSize: 20,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  tick: {
    // backgroundColor: 'purple',
    // width: '80%',
    // height: 50,
    // borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 30,
    // alignSelf: 'center',
    fontSize: 20,
  },
});

//make this component available to the app
export default Tableinfo;

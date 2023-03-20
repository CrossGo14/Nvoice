//import liraries
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  FlatList
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon, { FeatherIcon } from "react-native-vector-icons/Feather";
import Tableinfo from "./Tableinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./config";
import { doc, setDoc, addDoc, collection, getDocs, query, QuerySnapshot } from "firebase/firestore";


// create a component
const Table = () => {
  const Navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const table = firebase.firestore().collection("Table");

  const [tab, settab] = useState([]);

  const [MasterData, setMasterData] = useState([]);
  
  useEffect(async()=>{
    table
    .onSnapshot(
        querySnapshot=>{
            const tab =[]
            querySnapshot.forEach((doc)=>{
                const {Tableno} = doc.data()
                tab.push({
                    id:doc.id,
                    Tableno

                })
            })
            settab(tab)
        }
    )
  },[])

 

  return (
    <View style={styles.container}>
      <View style={styles.floatingbutton}>
        <TouchableOpacity onPress={() => Navigation.navigate("Tableinfo")}>
          <Icon name="plus-square" size={34}></Icon>
        </TouchableOpacity>
      </View>
<View>
    

</View>
      <FlatList
        data={tab}
        renderItem={({ item }) => (
          <View style={styles.listwrapper}>
            <Text style={styles.row}>{item.Tableno}</Text>
          </View>
        )}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: scale(150),
    height: verticalScale(150),
    borderRadius: 20,
    backgroundColor: "light-grey",
    marginTop: verticalScale(20),
  },
  floatingbutton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingLeft: scale(250),
    paddingTop: verticalScale(450),
  },
  // floatingbutton:{
  //     resizeMode:'contain',
  //     width:50,
  //     height:50,
  //     marginRight:
  // }
});

//make this component available to the app
export default Table;

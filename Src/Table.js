//import liraries
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon, { FeatherIcon } from "react-native-vector-icons/Feather";
import Tableinfo from "./Tableinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./config";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import Tablefood from "./Tablefood";



// create a component
const Table = () => {
  const Navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const table = firebase.firestore().collection("Table");

  const [tab, settab] = useState([]);

  const [MasterData, setMasterData] = useState([]);

  const fetch = async () => {
    table.onSnapshot((querySnapshot) => {
      const tab = [];
      querySnapshot.forEach((doc) => {
        const { Tableno } = doc.data();
        tab.push({
          id: doc.id,
          Tableno,
        });
        return () => {};
      });
      settab(tab);
    });
  };

  useEffect(() => {
    fetch();
  });

  return (
    <View>
      <View style={styles.floatingbutton}>
        <TouchableOpacity onPress={() => Navigation.navigate("Tableinfo")}>
          <Icon name="plus-square" size={34}></Icon>
        </TouchableOpacity>
      </View>
      <View></View>

      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={tab}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container} onPress={() => Navigation.navigate("Tablefood")}>
            <View styl={styles.innerContainer}>
              <Text>{item.Tableno}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
backgroundColor: "#e5e5e5",
padding: 15,
borderRadius:15,
margin: 5,
marginHorizontal: 10,

  },
innerContainer:{
alignItems: 'center',
flexDirection: "column",
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

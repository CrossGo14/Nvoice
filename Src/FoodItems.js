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
  SafeAreaView,
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


// create a component
const Tablefood = () => {

  const food = firebase.firestore().collection("fooditems");
  const [tab, settab] = useState([]);

  const fetch = async () => {
    food.onSnapshot((querySnapshot) => {
      const tab = [];
      querySnapshot.forEach((doc) => {
        const { Price,ItemName } = doc.data();
        tab.push({
          id: doc.id,
          Price,
          ItemName
        });
      });
      settab(tab);
    });
  };


  useEffect(() => {
    fetch();
  },[]);
 

  return (
    <View >
      <FlatList
        keyExtractor={(item) => item.id}
        data={tab}
        renderItem={({ item }) => (
           <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.ItemName}</Text>
              <Text style={styles.priceText}>{"₹"+item.Price}</Text>
            </View>
            </View>
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: "center",
    // alignItems: "center",
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  nameView: {
    width: '53%',
    margin: 10,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },


});

//make this component available to the app
export default Tablefood;

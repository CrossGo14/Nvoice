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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon, { FeatherIcon } from "react-native-vector-icons/Feather";
import Tableinfo from "./Tableinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from "./config";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

// create a component
const Cart = () => {

    const [cartlist, setcartList] = useState(0);

    const food = firebase.firestore().collection("fooditems");
    const table = firebase.firestore().collection("Table");
    const db = firebase.firestore();

    const Navigation = useNavigation();

    const cartCountFn = async () => {
        const documentId = await AsyncStorage.getItem("myKey");
        const documentSnapshot = await db.collection("Table").doc(documentId).get();
        const documentData = documentSnapshot.data();
        setcartList(documentData.cart);
        console.log(cartlist);

      };
      useEffect(() => {
        cartCountFn();
      }, []);
    
    return (
        <View style={styles.container}>
           <FlatList
        keyExtractor={(item) => item.id}
        data={cartlist}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.ItemName}</Text>
              <Text style={styles.priceText}>{"₹" + item.Price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                addCart(item);
              }}
            >
            
            </TouchableOpacity>
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
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  nameView: {
    width: "53%",
    margin: 10,
    alignSelf: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
  },
  priceText: {
    fontSize: 18,
    color: "green",
    fontWeight: "700",
  },
  cart: {
    flexDirection: "row",
    marginLeft: scale(300),
  },
});

//make this component available to the app
export default Cart;

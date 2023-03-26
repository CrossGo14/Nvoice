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
import Header from "./Header";

// create a component
const Tablefood = () => {
  let myKey = "";

  const food = firebase.firestore().collection("fooditems");
  const table = firebase.firestore().collection("Table");
  const db = firebase.firestore();
  const Navigation = useNavigation();

  const [tab, settab] = useState([]);

  const fetch = async () => {
    food.onSnapshot((querySnapshot) => {
      const tab = [];
      querySnapshot.forEach((doc) => {
        const { Price, ItemName } = doc.data();
        tab.push({
          id: doc.id,
          Price,
          ItemName,
        });
      });
      settab(tab);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  // const q= query(table,where("userId","==","myKey"));

  // const addCart = async (item) => {
  //   try {
  //     const documentId = await AsyncStorage.getItem("myKey");
  //     console.log(item);
  //     if (documentId !== null) {
  //       console.log(documentId);
  //       const documentSnapshot = await db
  //         .collection("Table")
  //         .doc(documentId)
  //         .get();
  //       const documentData = documentSnapshot.data();
  //       const updatedCart = [...documentData.cart, item];
  //       await db
  //         .collection("Table")
  //         .doc(documentId)
  //         .update({ cart: updatedCart });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addCart1 = async (item) => {
    try {
      const documentId = await AsyncStorage.getItem("myKey");
      console.log(item);
      if (documentId !== null) {
        console.log(documentId);
        const documentSnapshot = await db
          .collection("Table")
          .doc(documentId)
          .get();
        const documentData = documentSnapshot.data();

        const cartData=documentData.cart;

          if(cartData.length>0){
          let existing=false;
          cartData.map(itm=>{
            if(itm.id==item.id){
              existing=true;
              itm.qty=itm.qty+1;
            }})
            if(existing==false)
          {
            cartData.push(item)
          }
            const updatedCart = [...documentData.cart, item];
            await db
              .collection("Table")
              .doc(documentId)
              .update({ cart: updatedCart });
        }else{
          cartData.push(item);
              }
              const updatedCart = [...documentData.cart, item];
            await db
              .collection("Table")
              .doc(documentId)
              .update({ cart: updatedCart });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [cartcount, setcartcount] = useState();

  const cartCountFn = async () => {
    const documentId = await AsyncStorage.getItem("myKey");
    const documentSnapshot = await db.collection("Table").doc(documentId).get();
    const documentData = documentSnapshot.data();
    setcartcount(documentData.cart.length);
    console.log(cartcount);
  };

  useEffect(() => {
    cartCountFn();
  }, [cartcount]);

  return (
    <View>
      <TouchableOpacity onPress={() => Navigation.navigate("Cart")}>
        <View style={styles.cart}>
          <Icon name="shopping-cart" size={30}></Icon>
          <Text
            style={{
              backgroundColor: "red",
              width: 15,
              fontSize: 20,
              height: 25,
              color: "white",
            }}
          >
            {cartcount}
          </Text>
        </View>
      </TouchableOpacity>

      {/* <Header
        // title={'FoodApp'}
        icon={require('./cart.png')}
        count={cartCountFn}
        onClickIcon={() => {
        Navigation.navigate('Cart');
        }}
      /> */}
      <FlatList
        keyExtractor={(item) => item.id}
        data={tab}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.ItemName}</Text>
              <Text style={styles.priceText}>{"₹" + item.Price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                addCart1(item);
              }}
            >
              <View
                style={{
                  backgroundColor: "green",
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <Text style={{ color: "white", fontSize: 20, paddingTop: 10 }}>
                  Add To cart
                </Text>
              </View>
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
export default Tablefood;

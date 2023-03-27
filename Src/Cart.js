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

  const [cartcount, setcartcount] = useState();

  const[totalPrice,setTotalPrice]=useState(0);


  const food = firebase.firestore().collection("fooditems");
  const table = firebase.firestore().collection("Table");
  const db = firebase.firestore();


  const Navigation = useNavigation();

  const cartItem = async () => {
    const documentId = await AsyncStorage.getItem("myKey");
    const documentSnapshot = await db.collection("Table").doc(documentId).get();
    const documentData = documentSnapshot.data();
    setcartList(documentData.cart);
    console.log(cartlist);
    itemCount(documentData);
    Total(documentData.cart);
  };


  useEffect(() => {
    cartItem();

  }, []);

  const getTotal = () => {
    let total = 0;
    cartlist.map(item => {
      total = total + item.data.qty * item.data.discountPrice;
    });
    return total;
  };

  const increaseCount=async(item)=>{
    // console.log("increased")
    console.log(item.qty)
    try {
      const documentId = await AsyncStorage.getItem("myKey");
      console.log(item);
      item.qty = 1;
      if (documentId !== null) {
        console.log(documentId);
        const documentSnapshot = await db
          .collection("Table")
          .doc(documentId)
          .get();
        const documentData = documentSnapshot.data();

        let existing = false;
        let updatedCart = documentData.cart.map((itm) => {
          if (itm.id == item.id) {
            existing = true;
            if (itm.qty) itm.qty = itm.qty + 1;
          }
          return itm;
        });

        if(!existing)
          updatedCart = [...documentData.cart, item];
          console.log(updatedCart);

        await db
          .collection("Table")
          .doc(documentId)
          .update({ cart: updatedCart });

          cartItem();
          console.log(cartlist)
      }
    } catch (error) {
      console.log(error);
    }


  }

  const decreaseCount=async(item)=>{
    console.log("decreased")
    try {
      const documentId = await AsyncStorage.getItem("myKey");
      console.log(item);
      item.qty = 1;
      if (documentId !== null) {
        console.log(documentId);
        const documentSnapshot = await db
          .collection("Table")
          .doc(documentId)
          .get();
        const documentData = documentSnapshot.data();

        let updatedCart = documentData.cart.map((itm) => {
          if (itm.id == item.id) {
            itm.qty = itm.qty - 1;
          }
          return itm;
        });

        console.log('-===============')
        console.log(updatedCart)

        updatedCart = documentData.cart.filter((itm) => {
          return itm.qty
        });

        await db
          .collection("Table")
          .doc(documentId)
          .update({ cart: updatedCart });

          cartItem();
          console.log(cartlist)
      }
    } catch (error) {
      console.log(error);
    }


  }


  const itemCount=(documentData)=>{
    
    let totalLength=0
    documentData.cart.forEach((item) => {
      totalLength += item.qty;
    })
    setcartcount(totalLength);
    console.log(cartcount);
  }

  const Total=(cart)=>{
    let Total=0;
    cart.forEach(item=>{
      console.log(item)
      Total+=parseInt(item.Price)*item.qty;
      
    
    })
    setTotalPrice(Total)
console.log({Total})
  }



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

            <View style={styles.addRemoveView}>
              <TouchableOpacity
                style={[
                  styles.addToCartBtn,
                  {
                    flexDirection:'row',
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                  },
                ]}
                onPress={()=>decreaseCount(item)}
              >
                <Text
                  style={{ color: "green", fontSize: 20, fontWeight: "700"}}> - </Text>
                  </TouchableOpacity>

                <Text>{item.qty}</Text>
                  <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      flexDirection:'row',
                      width: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 15,
                    
                    },
                  ]}
                  onPress={()=>increaseCount(item)}
                  
                  >
                <Text style={{
                      color: 'green',
                      fontSize: 20,
                      fontWeight: '700',
                    }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.checkoutView}>
          <Text style={{color: '#000', fontWeight: '600'}}>
            {"Items"+"\n"+cartcount}
          </Text>
          <TouchableOpacity
            style={[
              styles.addToCartBtn,
              {
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              Navigation.navigate('Checkout');
            }}>
            <Text style={{color: 'green'}}>Create Bill{totalPrice}</Text>
            
          </TouchableOpacity>
        </View>
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
  addRemoveView: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkoutView: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Cart;

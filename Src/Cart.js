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
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import uuid from "react-native-uuid";
import moment from "moment";


// create a component
const Cart = () => {
  const [cartlist, setcartList] = useState(0);

  const [cartcount, setcartcount] = useState();

  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedPrinter, setSelectedPrinter] = React.useState();

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

  const increaseCount = async (item) => {
    console.log(item.qty);
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

        if (!existing) updatedCart = [...documentData.cart, item];
        console.log(updatedCart);

        await db
          .collection("Table")
          .doc(documentId)
          .update({ cart: updatedCart });

        cartItem();
        console.log(cartlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCount = async (item) => {
    console.log("decreased");
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

        console.log("-===============");
        console.log(updatedCart);

        updatedCart = documentData.cart.filter((itm) => {
          return itm.qty;
        });

        await db
          .collection("Table")
          .doc(documentId)
          .update({ cart: updatedCart });

        cartItem();
        console.log(cartlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const itemCount = (documentData) => {
    let totalLength = 0;
    documentData.cart.forEach((item) => {
      totalLength += item.qty;
    });
    setcartcount(totalLength);
    console.log(cartcount);
  };

  const Total = (cart) => {
    let Total = 0;
    cart.forEach((item) => {
      // console.log(item)
      console.log(cartlist);
      Total += parseInt(item.Price) * item.qty;
    });
    setTotalPrice(Total);
    console.log({ Total });
  };


  const userId = uuid.v4();

  const createHTML = (cartlist) => {
    console.log(cartlist)

    let itemString = '';
    for (const cartItem of cartlist){
      itemString += `          <tr>
      <td>${cartItem.ItemName}</td>
      <td>${cartItem.qty}</td>
      <td>${cartItem.Price}</td>
      <td>${parseInt(cartItem.Price)*parseInt(cartItem.qty)}</td>
    </tr>`
    }

    return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Invoice</title>
    <style>
      /* Add your invoice CSS styles here */
      body {
        font-family: Arial, sans-serif;
      }
      .invoice-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid black;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .invoice-header h1 {
        margin: 0;
        font-size: 24px;
      }
      .invoice-header p {
        margin: 0;
        font-size: 14px;
      }
      .invoice-details {
        border: 1px solid black;
        padding: 10px;
        margin-bottom: 20px;
      }
      .invoice-details h2 {
        margin-top: 0;
      }
      .invoice-details p {
        margin: 0;
      }
      .invoice-items {
        margin-bottom: 20px;
      }
      .invoice-items th {
        text-align: left;
        border-bottom: 1px solid black;
        padding-bottom: 5px;
      }
      .invoice-items td {
        border-bottom: 1px solid lightgray;
        padding: 5px 0;
      }
      .invoice-total {
        display: flex;
        justify-content: flex;
      }
      .invoice-total p {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="invoice-header">
      <h1>Invoice</h1>
      <p>Invoice: ${userId}</p>
    </div>
    <div class="invoice-details">
      <h2>Invoice Details</h2>
      <p>Invoice Date: ${moment().format('LLLL')} </p>

      <!-- Add more invoice details here -->
    </div>
    <table class="invoice-items">
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  
${itemString}
  
      </tbody>
    </table>
    <div class="invoice-total">
      <p>Total(*inclusive of all Taxes*):${totalPrice}</p>
    </div>
  </body>
  </html>
  `;
  };


  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html: createHTML(cartlist) });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf",dialogTitle:"abcd" });
  };

  let generatePDF = async () => {
    const file = await printToFile();
    await shareAsync(file);
  };

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
                    flexDirection: "row",
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    // marginRight: 7,
                  },
                ]}
                onPress={() => decreaseCount(item)}
              >
                <Text
                  style={{ color: "green", fontSize: 20, fontWeight: "700" }}
                > 
                  -
                </Text>
              </TouchableOpacity>
              <Text>{item.qty}</Text>
              <TouchableOpacity
                style={[
                  styles.addToCartBtn,
                  {
                    flexDirection: "row",
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                  },
                ]}
                onPress={() => increaseCount(item)}
              >
                <Text
                  style={{
                    color: "green",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutView}>
        <Text
          style={{
            color: "green",
            fontWeight: "600",
            flexDirection: "row",
            fontSize: 15,
          }}
        >
          {"Items    " + cartcount}
        </Text>

        <TouchableOpacity
          // style={[
          //   styles.addToCartBtn,
          //   {
          //     width: 100,
          //     height: 40,
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //   },
          // ]}
          onPress={() => {
            generatePDF();
          }}
        >
          <View
            style={{
              backgroundColor: "green",
              borderRadius: 10,
              width: scale(130),
            }}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Create Bill
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Total Price ₹{totalPrice}
            </Text>
          </View>
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
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

//make this component available to the app
export default Cart;

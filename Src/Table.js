//import liraries
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Pressable,
  FlatList,
  Keyboard,
  SafeAreaView,
  TextInput,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon, { FeatherIcon } from "react-native-vector-icons/AntDesign";
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
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const Table = () => {
  const Navigation = useNavigation();

  const table = firebase.firestore().collection("Table");
  const db = firebase.firestore();

  const [tabs, settabs] = useState([]);

  const [tableno, settableno] = useState("");

  const fetch = async () => {
    table.onSnapshot((querySnapshot) => {
      console.log(querySnapshot);
      const tabs = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const { Tableno, cart } = doc.data();
        tabs.push({
          id: doc.id,
          Tableno,
          cart,
        });
        // console.log(tabs)
        return () => {};
      });
      settabs(tabs);
    });
  };

  // const fetch=()=>{
  //   table
  //   .collection
  // }

  useEffect(() => {
    fetch();
  }, []);

  // const addtable = () => {
  //   if(!tableno)
  //   return alert("Table field is empty")
  //   const data = {
  //     Tableno: tableno,
  //     userId:userId,
  //     cart:[],

  //   };
  //   console.log("Data has been added",data);
  //    table
  //     .add(data)
  //     .then(() => {
  //       console.log('data uploaded successs')
  //       settableno(""), Keyboard.dismiss()
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       alert(error);
  //     });
  //   alert("Table Added");
  // };

  const userId = uuid.v4();

  const addtable = async () => {
    if (!tableno) return alert("Table field is empty");
    const data = {
      Tableno: tableno,
      userId: userId,
      cart: [],
    };
    console.log("Data has been added", data);
    table
      .doc(userId)
      .set(data)
      .then(async () => {
        console.log("data uploaded successs");
        settableno(""), Keyboard.dismiss();

        readDataFromAsyncStorage();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    alert("Table Added");
  };

  const readDataFromAsyncStorage = async () => {
    try {
      const documentId = await AsyncStorage.getItem("myKey");
      if (documentId !== null) {
        const documentSnapshot = await db
          .collection("Table")
          .doc(documentId)
          .get();
        const documentData = documentSnapshot.data();
        console.log(documentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToNextScreen = async (userId, mobile, name) => {
    if (userId) {
      await AsyncStorage.setItem("USERID", userId);
      console.log("data stored onto local storage");
    }
    // navigation.navigate('Tablefood');
  };

  const addDataAndSaveId = async (data) => {
    try {
      const docRef = firebase.firestore().collection("Table");
      const docId = docRef.id;
      await AsyncStorage.setItem("TABLEID", docId);
      console.log("Asyncdata added");
      const value = AsyncStorage.getItem("TABLEID");
      console.log("Value is" + JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTable = async (documentId) => {
    table
      .doc(documentId)
      .delete()
      .then(() => {
        // show a successful alert
        alert("Deleted Successfully");
        console.log(documentId);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={tabs}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={async () => {
              const documentId = item.id;
              await AsyncStorage.setItem("myKey", documentId);
              Navigation.navigate("Tablefood");
            }}
          >
            <View styl={styles.innerContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 23 }}>{item.Tableno}</Text>
                <Icon
                  name="delete"
                  size={23}
                  color={"red"}
                  onPress={() => deleteTable(item.id)}
                  style={{ marginLeft: scale(90), position: "absolute" }}
                ></Icon>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* <SafeAreaView style={styles.input}>
      <View style={styles.action}>
        <TextInput
          placeholder="Enter Number"
          value={tableno}
          onChangeText={(text) => settableno(text)}
          style={styles.textinput}
        />
        <TouchableOpacity onPress={addtable}>
          <Text style={styles.tick}>✓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> */}

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={tableno}
            placeholder="Add Table No."
            onChangeText={(text) => settableno(text)}
            style={{ fontSize: 25 }}
          />
          <TouchableOpacity onPress={addtable}>
            <View style={styles.iconContainer}>
              <Icon
                name="plus"
                size={25}
                style={{ position: "absolute" }}
              ></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    width: scale(150),
    height: scale(70),
  },
  innerContainer: {
    alignItems: "center",
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
  // },
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
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  input: {
    marginTop: 550,
  },
  footer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: scale(490),
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: "white",
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    // height: 50,
    // width: 50,
    // elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(240),
  },
});

//make this component available to the app
export default Table;

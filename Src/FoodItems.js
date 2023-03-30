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
import Icon, { FeatherIcon } from "react-native-vector-icons/AntDesign";
import Tableinfo from "./Tableinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./config";
import AddFood from './AddFood';
import { Ionicons } from "@expo/vector-icons";
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
    const Navigation = useNavigation();
    const Stack = createNativeStackNavigator();


  
  const press = () => {
    Navigation.navigate("AddFood");
  };


  const fetch = async () => {
    food.onSnapshot((querySnapshot) => {
      const tab = [];
      querySnapshot.forEach((doc) => {
        const { Price, ItemName } = doc.data();
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
  }, []);

 


  const deleteTable = async (documentId) => {
    food
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
    <><View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={tab}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.ItemName}</Text>
              <Text style={styles.priceText}>{"₹" + item.Price}</Text>
              <View style={styles.container}>
              <Icon
                  name="delete"
                  size={27}
                  color={"red"}
                  onPress={() => deleteTable(item.id)}
                  style={{ marginLeft: scale(260),marginVertical: scale(-30), position: "absolute" }}
                ></Icon>

              </View>
            </View>

          </View>



        )} />
    </View><View style={styles.container}>
        <TouchableOpacity
          style={styles.floatingbutton}
          onPress={press}
        >
          <Ionicons name="add-circle" size={45} color="black" />

        </TouchableOpacity>
      </View></>
      
    

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
flexDirection:'row'
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
    margin: 20,
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
  floatingbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
   
  },

});

//make this component available to the app
export default Tablefood;

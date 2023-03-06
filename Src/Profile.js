//import liraries
import React, {useState} from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity ,Button,FlatList,SafeAreaView,TextInput} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Edit from './Edit';
import Login from './Login';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';



// create a component
const Profile = (props,{navigation}) => {
    
    const Navigation = useNavigation();
    const Stack=createNativeStackNavigator();



    function ViewStackScreen(){
        return (
        <Stack.Navigator>
        <Stack.Screen name="Edit" component={Edit}
        options={{
        headerShown: false,
        }}
        />
        </Stack.Navigator>
        )
        }

    const [setting, setSetting] = useState([
        {name: "GST", key: "1"},
        {name: "Log Out ", key: "2"},
        {name: "Delete Accunt", key: "3"},
   
        ]);

        const check=()=>{
            console.log("Check")
        };

    return (
        <SafeAreaView>

            <SafeAreaView style={styles.circle}>
                <Image style={styles.img} source={require('./assets/p1.jpg')}></Image>
            </SafeAreaView>

            <View style={styles.editview}>

            <TouchableOpacity onPress={()=>Navigation.navigate("Edit")}>
                    <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
         
            </View>

        <View >
            <FlatList
        
                keyExtractor={(item, index) => String(index)}
                data={setting}
                style={{paddingTop:scale(95)}}
                renderItem={({ item }) => (
          <TouchableOpacity onPress={check}>
            <Text style={styles.flatstyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
        </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    header:{
            width: '100%',
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#C0C0C0'
    },
    circle:{
        height:scale(100),
        width: scale(100),
        borderRadius: 100,
        paddingLeft:50,
        borderColor:'white',
        marginRight:scale(100),
        justifyContent:'center',
        overflow: 'hidden',
        position:'absolute'
    },
    img:{
        height:100,
        width:100,
        borderRadius:50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    flatstyle: {
        fontWeight:'bold',
        fontSize:scale(19),

       
        },
        edit:{
            fontSize:20,
            fontWeight:'bold',
            color:'blue',
            paddingLeft:scale(300)
        },
});

//make this component available to the app
export default Profile;

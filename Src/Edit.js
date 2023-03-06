//import liraries
import React, { Component,useState,useRef,useCallback } from 'react';
import { View, Text,Button, StyleSheet,SafeAreaView,TextInput,Image,ImageBackground,TouchableOpacity} from 'react-native';
import Profile from './Profile';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import ig from './assets/p2.png'
import * as FileSystem from 'expo-file-system';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon, { FeatherIcon } from 'react-native-vector-icons/Feather';


// create a component
function Edit(){  
  const sheetref=useRef(null);
    const [isopen,setisopen]=useState(true);


    const handlepress=useCallback((index)=>{
        sheetref.current?.snapToIndex(index);
        setisopen(true); 
    },[]);

    const[image,setimage]=useState();

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          const fileName = result.assets[0].uri.split('/').pop();
          const destinationPath = `${FileSystem.documentDirectory}${fileName}`;
          await FileSystem.copyAsync({
            from: result.assets[0].uri,
            to: destinationPath,
          });
          setimage(result.assets[0].uri);        
        }
      };

const snapPoints=["50%"]
   

    return (
    <View style={styles.container}>
        <BottomSheet
        style={styles.bottom}
        ref={sheetref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        initialSnap={1}
        onClose={()=>setisopen(false)}>
            <BottomSheetView
            initialSnap>
                <View style={{alignItems:'center'}}>
                <Text style={{fontSize:25}}>Upload a Photo</Text>
                <Text style={{fontSize:15,color:'grey'}}>Choose your profile pictre</Text>
                </View>
                <View style={{alignItems:'center',paddingTop:30}}>
                    <TouchableOpacity style={styles.panelButton} onPress={handleImagePicker}>
                        <Text style={styles.panelButtonTitle}>Take Photo  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton}>
                        <Text style={styles.panelButtonTitle}>From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton}>
                        <Text style={styles.panelButtonTitle}>Cancel          </Text>
                    </TouchableOpacity>
                </View>
                
            </BottomSheetView>
        </BottomSheet>


        
       
        <View style={{margin:20}}>

        <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>handlepress(1)}>

            <View style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
            
            }}>
                <Image source={require('./assets/p1.jpg')} style={{borderRadius:50,width:100,height:100}} />
            </View>
            </TouchableOpacity>

        </View>
            <View style={styles.action}>
            <Icon name='user' size={20} color='grey' />

          <TextInput
            placeholder="  First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
          />
        </View>
        <View style={styles.action}>
        <Icon name='phone' size={20} color='grey' />

          <TextInput
            placeholder="  Phone Number"
            placeholderTextColor="#666666"
            keyboardType='number-pad'
            autoCorrect={false}
          />
          
        </View>
        <View style={styles.action}>
          <Icon name='mail' size={20} color='grey' />
          <TextInput
            placeholder="  Email"
            keyboardType='email-address'
            placeholderTextColor="#666666"
            autoCorrect={false}
          />
        </View>
        <Button title='Submit' />
        </View>
    </View>
       
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal:{
      margin: 0,

    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      panelButton: {
        padding: scale(10),
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: verticalScale(9),
        paddingHorizontal:scale(110)
        
      },
      action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },
});

//make this component available to the app
export default Edit;
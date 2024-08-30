import { View, Image, Text, StyleSheet, Dimensions } from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import { hoursOfDay } from "../../utils/constanst";
import { useContext } from "react";
import toAMorPM from "../../utils/AmPm";
import * as Notificationss from 'expo-notifications'
import { NotificationContext } from "../Notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getTranslation } from '../../utils/useLenguage';

const { width, height } = Dimensions.get('window');

export const Slide = ({slide, editHour, setEditHour}) => {

  const {schedulePushNotification} = useContext(NotificationContext)

  const generatePickerItems = () => {
    let items = [];
    for (let i = 0; i < hoursOfDay.length; i ++) {
      items.push({ label:  toAMorPM(hoursOfDay[i]), value: hoursOfDay[i] });
    }
    return items;
  };

  async function settingEditHour (hour) {
    setEditHour(hour)
    await Notificationss.cancelAllScheduledNotificationsAsync();

    schedulePushNotification(hour)

    await AsyncStorage.setItem('dayStart', hour.toString())
  }

    if (slide == 1) {
      return (
        <View style={styles.slide}>
          <Text style={[{fontSize:30, fontWeight:"bold"},styles.text]}>{getTranslation("slides",0)}</Text>
          <Image  style={{width:120, height:120, borderRadius:20 ,marginVertical:25, elevation: 5,}}/>
          <Text style={styles.text}>{getTranslation("slides",1)}</Text>
        </View>
      )
    }
    if (slide == 2) {
     return (
       <View style={styles.slide}>
         <Image  style={{width:120, height:120}} />
         <Text style={styles.text}>{getTranslation("slides",2)}</Text>
       </View>
     )
    }
    if (slide == 3) {
     return (
       <View style={styles.slide}>
         <Image  style={{width:210, height:120, marginVertical:30}} />
         <Text style={[styles.text,{fontSize:20}]}>{getTranslation("slides",3)}</Text>
         <RNPickerSelect
                onValueChange={(value) => settingEditHour(value)}
                items={generatePickerItems()}
                value={editHour}
                style={{ ...pickerSelectStyles }}
              />
       </View>
     )
    }
 }

 const styles = StyleSheet.create({
    slide: {
      text: "white",
      width,
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    },
    text: {
      paddingHorizontal: 20,
      marginVertical: 20,
      textAlign: "center",
    },
  })

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });
  
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native'
import {useState, useEffect,useContext} from 'react'
import { Header, Hero, TimeLine } from '../components/Today';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../components/Notifications'
import { useNavigate } from 'react-router-native';
import { getTranslation } from '../utils';
import RNPickerSelect from 'react-native-picker-select';
import { hoursOfDay } from '../utils/constanst';
import toAMorPM from '../utils/AmPm';
import { currentHour } from '../utils/constanst';
import { currentDay } from '../utils/constanst';
import * as Notificationss from 'expo-notifications'

const { width, height } = Dimensions.get("window");

const TodayScreen = () => {

  const [tareas, setTareas] = useState(null)
  const [tareaNow, setTareaNow] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [editHour, setEditHour] = useState(currentHour+9)
  const [dayStart, setDayStart] = useState(6)
  const [idiom, setIdiom] = useState("Español")
  const navigation = useNavigate()
  const {schedulePushNotification} = useContext(NotificationContext)

  useEffect(() => {
    async function a () {
      const newTareas = JSON.parse(await AsyncStorage.getItem('hours'))
      let tareaNow
      if (!newTareas || newTareas.length == 0) {
        return
      }
      newTareas.map((tarea) => {
        tarea.hours.map((hour) => {
          if (hour == currentHour) {
            tareaNow = tarea
          }

        })
      })
      setTareas(newTareas)
      setTareaNow(tareaNow)
    }
    a()
    cargarEditHour()
  },[])

  async function cargarEditHour () {
    const storedHour = parseInt(await AsyncStorage.getItem('editHour'))
    if (!storedHour) {
      setEditHour(currentHour+9)
      return
    }
    setEditHour(storedHour)
  }

  async function settingEditHour (hour) {
    setEditHour(hour)
    await Notificationss.cancelAllScheduledNotificationsAsync();
    schedulePushNotification(hour)
    await AsyncStorage.setItem('editHour', hour.toString())
    const storedEnded = await AsyncStorage.getItem('ended')

    if (currentHour >= hour && storedEnded < currentDay) {
      navigation('/rateDay')
    } 
  }

  async function settingIdiom (idiom) {
    setIdiom(idiom == "es"?"Español":"Ingles")
    await AsyncStorage.setItem('language', idiom)
  }

  async function settingDayStart (hour) {
    if (hour !== dayStart) {
      setDayStart(hour)
      await AsyncStorage.setItem('dayStart', hour.toString())
      navigation('/setDaily')
    }

  }

  const generatePickerItems = () => {
    let items = [];
    for (let i = 0; i < hoursOfDay.length; i ++) {
      items.push({ label:  toAMorPM(hoursOfDay[i]), value: hoursOfDay[i] });
    }
    return items;
  };

  return (
    <View>
      <ScrollView style={[styles.mainView]}>
        <Header setOpenMenu={setOpenMenu} openMenu={openMenu}/>
        <Hero tarea={tareaNow} currentHour={currentHour}/>
        <TimeLine tareas={tareas} currentHour={currentHour}/>
        <View style={{height: 250,}}/>
      </ScrollView>
      {openMenu && (
        <>
        {/* Fondo semi-transparente detrás del menú */}
        <TouchableOpacity onPress={() => setOpenMenu(false)} style={styles.background} />
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => {navigation('/setDaily')}} style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 1)}</Text>
            <RNPickerSelect
                onValueChange={(value) => settingEditHour(value)}
                items={generatePickerItems()}
                value={editHour}
                style={{ ...pickerSelectStyles }}
              />
          </TouchableOpacity>
          <TouchableOpacity style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 3)}</Text>
            <RNPickerSelect
                onValueChange={(value) => settingDayStart(value)}
                items={generatePickerItems()}
                value={dayStart}
                style={{ ...pickerSelectStyles }}
              />
          </TouchableOpacity>
          <TouchableOpacity style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 2)}</Text>
            <RNPickerSelect
                onValueChange={(value) => settingIdiom(value)}
                items={[{label: "Español", value: "es" },{ label:  "English", value: "en" }]}
                value={idiom}
                style={{ ...pickerSelectStyles }}
              />
          </TouchableOpacity>
        </View>
        </>
      )}
    </View>
    
  )
}

export default TodayScreen

const styles = StyleSheet.create({

    mainView: {
        width,
    },
    dropdownMenu: {
      marginTop: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: '#ccc',
      position:"absolute",
      zIndex: 99,
      borderWidth: 1,
      right: 50,
      top: 25,
      elevation: 3, // sombra para Android
      shadowColor: '#000', // sombra para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    background: {
      backgroundColor:"#0000001a",
      width,
      position:"absolute",
      height,
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

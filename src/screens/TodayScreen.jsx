import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text} from 'react-native'
import {useState, useEffect} from 'react'
import { Header, Hero, TimeLine } from '../components/Today';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';
import { getTranslation } from '../utils';

const { width } = Dimensions.get("window");

const TodayScreen = () => {

  const [tareas, setTareas] = useState(null)
  const [tareaNow, setTareaNow] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const navigation = useNavigate()

  useEffect(() => {
    async function a () {
      const newTareas = JSON.parse(await AsyncStorage.getItem('hours'))
      if (!newTareas || newTareas.length == 0) {
        navigation('/setDaily')
      }
      setTareas(newTareas)
      setTareaNow(newTareas[0])
    }
    a()
  },[])

  return (
    <ScrollView style={[styles.mainView]}>
      {openMenu && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => {navigation('/setDaily')}} style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 1)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin:15}}>
            <Text style={{fontSize:17}}>{getTranslation('menu', 2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      <Header setOpenMenu={setOpenMenu} openMenu={openMenu}/>
      <Hero tarea={tareaNow}/>
      <TimeLine tareas={tareas}/>
      <View style={{height: 250,}}/>
    </ScrollView>
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

})
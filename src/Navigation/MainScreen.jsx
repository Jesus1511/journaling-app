import { StyleSheet, ScrollView } from 'react-native';
import TodayScreen from '../screens/TodayScreen';
import SavedsScreen from '../screens/SavedsScreen';
import { currentDay, currentHour } from '../utils/constanst';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from '../components/Notifications';
import {clear} from '../utils/clear'

const MainScreen = () => {

  const navigation = useNavigate()
  const {schedulePushNotification} = useContext(NotificationContext)

  useEffect(() => {
    redirectGuide()
  },[])

  async function redirectGuide() {
    const didSee = new Boolean(await AsyncStorage.getItem('guide'))
    if (didSee == false) {
      navigation('/appguide')
    } else {
      definirMomento()
    }
  }

  async function definirMomento () {

    const storedDayPlan = JSON.parse(await AsyncStorage.getItem('hours'))

    if (!storedDayPlan || storedDayPlan.length < 0) {
      navigation('/setDaily')
      return
    }
    let storedEditHour = parseInt(await AsyncStorage.getItem('editHour'))
    let isDayEnded =  parseInt(await AsyncStorage.getItem('ended'))

    if (!isDayEnded) {
      await AsyncStorage.setItem('ended',(currentDay-1).toString())
      isDayEnded = currentDay-1
    }

    if (!storedEditHour) {
      await AsyncStorage.setItem('editHour', (currentHour+9).toString())
      schedulePushNotification(currentHour+9)
      storedEditHour = currentHour+9
    }

    if (currentHour >= storedEditHour && isDayEnded < currentDay){
      navigation('/rateDay')
    }
  }



  return (
    <>
      <ScrollView style={styles.scrollView} horizontal pagingEnabled>
        <TodayScreen />
        <SavedsScreen />
      </ScrollView>
    </>
  )
}

export default MainScreen

const styles = StyleSheet.create({});

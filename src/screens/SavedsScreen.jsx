import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import {useState, useEffect} from 'react'
import { DayMap, Goals, SecundaryGoals} from '../components/Saveds'
import { Header } from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-native';

const { width, height } = Dimensions.get("window");

const SavedsScreen = () => {

  const [goals, setGoals] = useState(null)
  const [month, setMonth] = useState(null)
  const navigator = useNavigate()

  useEffect(() => {
    cargarGoals()
    cargarCalifications()
  },[])
  
  async function cargarGoals () {
    const newGoals = JSON.parse(await AsyncStorage.getItem('month'))
    if (!newGoals || newGoals.length == 0) {
      navigator('/setMonth')
      return
    }
    setGoals(newGoals)
  }

  async function cargarCalifications () {
    //await AsyncStorage.removeItem('califications')
    const storedCalifications = JSON.parse(await AsyncStorage.getItem('califications'))
    if (!storedCalifications) {
      setMonth([])
      return
    }

    setMonth(storedCalifications)
  }

  return (
      <ScrollView style={styles.mainView}>
        <Header text={"info"}/>
        <DayMap days={month}/>
        <SecundaryGoals/>
        {goals && (<Goals Goals={goals}/>)}
        <View style={{height: 350,}}/>
      </ScrollView>
    )
}

export default SavedsScreen

const styles = StyleSheet.create({
    mainView: {
        width,
        height,
    }
})
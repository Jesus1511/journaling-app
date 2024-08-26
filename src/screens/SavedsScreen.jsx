import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import {Header, DayMap, Goals, SecundaryGoals} from '../components/Saveds'


const { width, height } = Dimensions.get("window");

const s = [50, 100, 100, 25, 50, 50, 75,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0
]

const d = ["superar 500kg en press banca",
            "conquistar stonio para navidad",
            "derrotar al chavismo y asesinar a Yulimar Rojas"
]

const SavedsScreen = () => {
  return (
      <ScrollView style={styles.mainView}>
        <Header />
        <DayMap days={s}/>
        <SecundaryGoals/>
        <Goals Goals={d}/>
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
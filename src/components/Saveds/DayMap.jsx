import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import {useState} from 'react'
import { getTranslation } from '../../utils'

export const DayMap = ({days}) => {

    return (
      <View style={styles.dadView}>
        <Text style={{width: "81%", marginBottom:5, fontSize: 16}}>{getTranslation('today',3)}</Text>
        <View style={styles.mainView}>
          <Days days={days}/>
        </View>
      </View>
    )
}

const Days = ({days}) => {

  function defineColor (porcent) {
    if (porcent == 0) {
      return "#00e60f00"
    }
    if (porcent == 25) {
      return "#00e60f3f"
    }
    if (porcent == 50) {
      return "#00e60f7b"
    }
    if (porcent == 75) {
      return "#00e60fb6"
    }
    if (porcent == 100) {
      return "#00e60f"
    }
  }

  if (days) {
    return (
      <>
        {days.map((day, index) => (
           <View key={index} style={styles.dayContainer}>
             <View style={[styles.miniBox, {backgroundColor: defineColor(day.calification)}]}>
               <Text style={{fontSize: 10, color:"black", textAlign: "center"}}>{day.calification !== null?day.calification +"%":getTranslation('month', 2)}</Text>
             </View>
           </View>
         ))}
      </> 
      )
  } else {
    <View style={{justifyContent:"center", alignItems:"center"}}>
      <ActivityIndicator />
    </View>
  }
}

const styles = StyleSheet.create({
    mainView: {
      width: "90%",
      minHeight: 200,
      borderRadius: 20,
      paddingHorizontal:30,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent:"left",
      backgroundColor: "#f7f7f7",
      flexWrap: "wrap",
      
    },
    dadView: {
      paddingTop: 30,
      alignItems: "center",

    },
    miniBox: {
      width:30,
      height:30,
      justifyContent:"center",
      alignItems:"center",
      borderRadius: 5
    },
    dayContainer: {
      alignItems: "center",
      marginHorizontal: 5,
      marginVertical: 3
    },
})
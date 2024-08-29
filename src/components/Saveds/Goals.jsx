import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils/useLenguage'

export const Goals = ({Goals}) => {
  return (
    <View style={{alignItems: "center"}}>
      <View style={styles.bar}/>
      <Text style={styles.text}>{getTranslation('today', 4)}</Text>
      {Goals.map((goal, index) => (
        <View key={index} style={styles.goalContainer}>
          <Text style={styles.goalText}>{goal.importance}°  {goal.text}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    marginTop: 30,
    marginBottom: 20,
  },
  goalText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    marginBottom: 10,
  },
  goalContainer: {
    width: "80%"
  },
  bar: {
    width: "80%",
    height: 1,
    backgroundColor: "black"
},
})
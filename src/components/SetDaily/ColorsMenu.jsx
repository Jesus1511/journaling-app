import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constanst.js'

const ColorsMenu = ({setHours, hour, hours, setVisible}) => {

  function handleColor (color, indexs) {
      const newHours = [...hours];
      hours.map((hour, index) => {
        if (hour.index == indexs) {
          newHours[index].color = color
        }
      })
      setHours(newHours);
      setVisible(null)
    }

  return (
    <View style={styles.dropdownMenu}>
      {colors.map((color, index) => (
        <View key={index} style={{flexDirection: "row"}}>
          <TouchableOpacity 
            style={[styles.colorButton, {margin: 10, backgroundColor: color[0]}]} 
            onPress={() => {handleColor(color[0], hour.index)}}
          />
          <TouchableOpacity 
            style={[styles.colorButton, {margin: 10, backgroundColor: color[1]}]} 
            onPress={() => {handleColor(color[1], hour.index)}}
          />
        </View>
      ))}
    </View>
  )
}

export default ColorsMenu

const styles = StyleSheet.create({

    dropdownMenu: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#ccc',
        position:"absolute",
        zIndex: 99,
        borderWidth: 1,
        right: 90,
        elevation: 3, // sombra para Android
        shadowColor: '#000', // sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex:9999,
      },
      menuItem: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      colorButton: {
        borderRadius: 220,
        elevation: 3, // sombra para Android
        shadowColor: '#000', // sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 23,
        height: 23,
      },

})
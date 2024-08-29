import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native'
import React from 'react'

const { width } = Dimensions.get("window");

export const Header = ({text}) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity>
        <View/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  mainView: {
    width,
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f7f7"
  },

  text: {
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "Montserrat-Bold"
  }

})
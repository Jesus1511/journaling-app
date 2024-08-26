import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils/useLenguage';

const { width, height } = Dimensions.get("window");

export const Header = () => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>{getTranslation('today',0)}</Text>
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
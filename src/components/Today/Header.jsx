import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils/useLenguage';
import hamburgesa from '../../../assets/images/hamburger.png'

const { width, height } = Dimensions.get("window");

export const Header = ({openMenu, setOpenMenu}) => {
  return (
    <>
      <View style={styles.mainView}>
        <Text style={styles.text}>{getTranslation('today',0)}</Text>
        <TouchableOpacity onPress={()=>{setOpenMenu(!openMenu)}} style={{margin:5}}>
          <Image style={{width: 30, height: 30,}} source={hamburgesa}/>
        </TouchableOpacity>
      </View>
    </> 

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
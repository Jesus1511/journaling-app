import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils'
import { useState, useEffect } from 'react'

export const Hero = ({tarea}) => {

  const [shortenedText, setShortenedText] = useState('');
  const [now, setNow] = useState(false);


  useEffect(() => {
    if (tarea.name.length > 15) {
      setShortenedText(tarea.name.substring(0, 45) + '...');
    } else {
      setShortenedText(tarea.name);
    }
  }, [tarea]);

  return (
    <View style={{alignItems: "center", paddingTop:50}}>
        <Text style={{width: "83%", marginBottom:5, fontSize: 16}}>{getTranslation("today",1)}</Text>
        <View style={[styles.heroView,{backgroundColor: tarea.color}]}>
          <View style={styles.horas}>
            {tarea.horas.map((hora) => (
              <Text style={{fontSize: 20, fontFamily:"Montserrat-Regular", fontWeight:now?"700":"300"}} key={hora}>{hora}</Text>
            ))}
          </View>
          <View >
            <Text style={{width:220, fontSize:25, fontFamily:"Montserrat-Bold"}}>{shortenedText}</Text>
          </View>
          <TouchableOpacity>
            <Image source={tarea.notificacion?"":""}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

  heroView: {
    width: "90%",
    height: 180,
    borderRadius: 10,
    paddingHorizontal:30,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  horas: {
    justifyContent: "space-around",
    maxHeight: 135
  }

})
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils'
import { useState, useEffect } from 'react'

export const Hero = ({tarea}) => {

  const [shortenedText, setShortenedText] = useState('');
  const [now, setNow] = useState(false);
  const [h, setH] = useState(45)

  useEffect(() => {
    if (tarea) {
      
      if (tarea.text.length > 15) {
        setShortenedText(tarea.text.substring(0, 45) + '...');
      } else {
        setShortenedText(tarea.text);
      }

      setH(45*tarea.hours.length)
    }
  }, [tarea]);

  return (
    <View style={{alignItems: "center", paddingTop:50}}>
        <Text style={{width: "83%", marginBottom:5, fontSize: 16}}>{getTranslation("today",1)}</Text>
        <View style={[styles.heroView,{height: h, backgroundColor: tarea == null? "#dedede":tarea.color}]}>
          {
            tarea  ? 
            (
              <>
              <View style={styles.horas}>
                {tarea.hours.map((hora) => (
                  <Text style={{fontSize: 20, fontFamily:"Montserrat-Regular", fontWeight:now?"700":"300"}} key={hora}>{hora}</Text>
                ))}
              </View>
              <View >
                <Text style={{width:220, fontSize:25, fontFamily:"Montserrat-Bold"}}>{shortenedText}</Text>
              </View>
              <TouchableOpacity>
                <Image source={tarea.notificacion?"":""}/>
              </TouchableOpacity>
              </>
            ):(
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator />
              </View>
            )
          }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

  heroView: {
    width: "90%",
    borderRadius: 10,
    paddingHorizontal:30,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent:"space-between",
    minHeight: 70,
  },
  horas: {
    justifyContent: "space-around",
  }

})
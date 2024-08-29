import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils'
import { useState, useEffect } from 'react'
import toAMorPM from '../../utils/AmPm'

export const Hero = ({tarea, currentHour}) => {

  const [shortenedText, setShortenedText] = useState('');
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
                  <Text style={{fontSize: 15, fontFamily:"Montserrat-Regular", fontWeight:hora == currentHour?"700":"300"}} key={hora}>{toAMorPM(hora)}</Text>
                ))}
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{width:200, fontSize:25, fontFamily:"Montserrat-Bold"}}>{shortenedText}</Text>
                <Text style={{fontFamily:"Montserrat-Regular", fontSize:17}}>{tarea.hours.length}h</Text>
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
    paddingHorizontal:14,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent:"space-between",
    minHeight: 70,
  },
  horas: {
    justifyContent: "space-around",
    paddingRight:20
  }

})
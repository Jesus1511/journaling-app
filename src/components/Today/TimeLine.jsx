import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils'
import { useState } from 'react'
import toAMorPM from '../../utils/AmPm'

export const TimeLine = ({tareas}) => {

  const [now, setNow] = useState("");

  function shortener (tarea, horas) {
    if (tarea.length > 25*horas) {
      return tarea.substring(0, 25*horas) + '...';
    } else {
      return tarea
    }
  }
  
  return (
    <View style={{alignItems: "center", paddingTop:50}}>
        <Text style={{width: "83%", marginBottom:20, fontSize: 16}}>{getTranslation("today",2)}</Text>
        {tareas.map((tarea, index) => (
          <>
            <View key={index+tareas.length} style={{width: "100%", height: 2, flexDirection:"row-reverse"}}>
              <View style={styles.bar}/>
            </View>
            <View key={index} style={styles.mainView}>
              <View style={[styles.horas, {height: 45*tarea.horas.length}]}>
                {tarea.horas.map((hora, index) => (
                  <Text style={[styles.textHour, {fontWeight:now==hora?"700":"300"}]} key={index}>{toAMorPM(hora)}</Text>
                ))}
              </View>
              
              <View key={tarea.horas[0]} style={[styles.heroView,{backgroundColor: tarea.color, height: 45*tarea.horas.length}]}>
                <View>
                  <Text style={{width:220, fontSize:18, fontFamily:"Montserrat-Bold"}}>{shortener(tarea.name, tarea.horas.length)}</Text>
                </View>
              </View>

              <View style={styles.icons}>
                <TouchableOpacity>
                  {/* <Image source={tarea.notificacion?"":""}/> */}
                  <Text>campana</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({

  heroView: {
    width: "73%",
    paddingHorizontal:25,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent:"space-between",
    borderRadius: 10,
    marginVertical: 5
  },
  horas: {
    width: "15%",
    justifyContent:"center",
    alignItems:"center"
  },
  mainView: {
    flexDirection: "row"
  },
  textHour: {
    fontSize: 14,
    fontFamily:"Montserrat-Regular",
    textAlign:"center",
    marginBottom: 28,
    position: "relative",
    bottom: 11
  },
  bar: {
    height:1,
    width: "87%",
    backgroundColor: "black"
  },
  icons: {
    width: "12%",
  }

})
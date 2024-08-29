import { StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native'
import React from 'react'
import { getTranslation } from '../../utils'
import toAMorPM from '../../utils/AmPm'

const {width} = Dimensions.get('window')

export const TimeLine = ({tareas, currentHour}) => {

  function shortener (tarea, horas) {
      if (tarea.length > 25*horas) {
        return tarea.substring(0, 25*horas) + '...';
      } else {
        return tarea
      }
  }

  function calculateHeight (leng) {
    if (leng == 1){
      return 60
    } else {
      return 73*leng
    }
  }
  
  return (
    <View style={{alignItems: "center", paddingTop:50}}>
        <Text style={{width: "83%", marginBottom:20, fontSize: 16}}>{getTranslation("today",2)}</Text>
        {
          tareas ? (
            tareas.map((tarea, index) => (
                <View key={index} style={styles.mainView}>
                    <View style={[styles.horas]}>
                      <Text style={styles.textHour} key={index}>{toAMorPM(tarea.hours[0])}</Text>
                    <View style={styles.bar}/>
                    </View>
                    <View style={{flexDirection:"row-reverse"}}>
                      <View key={tarea.hours[0]} style={[styles.heroView,{backgroundColor: tarea.color, height: calculateHeight(tarea.hours.length)}]}>
                          <Text style={{maxWidth:220, fontSize:18, fontFamily:"Montserrat-Bold"}}>{shortener(tarea.text, tarea.hours.length)}</Text>
                          <Text style={{fontFamily:"Montserrat-Regular", fontSize:17}}>{tarea.hours.length}h</Text>
                      </View>
                      <View>
                        {tarea.hours.map((hour, index) => (
                            index !== 0 && (
                              <View key={index}>
                                <Text style={[styles.textHour, {marginTop: 60, fontWeight:hour == currentHour?700:300}]}>{toAMorPM(hour)}</Text>
                              </View>
                            )
                          ))}
                      </View>
                    </View>
                </View>
            ))
          ) : (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
              <ActivityIndicator />
            </View>
          )
        }

    </View>
  )
}

const styles = StyleSheet.create({

  heroView: {
    width: 300,
    paddingHorizontal:25,
    paddingVertical: 8,
    flexDirection: "row",
    marginRight:5,
    justifyContent:"space-between",
    borderRadius: 8,
  },
  horas: {
    width,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection: "row",
  },
  mainView: {

  },
  textHour: {
    fontSize: 14,
    fontFamily:"Montserrat-Regular",
    textAlign:"center",
    marginRight:10,
  },
  bar: {
    height:1,
    width: "85%",
    backgroundColor: "black"
  },
  icons: {
    width: "12%",
  },
  textHour: {
    fontSize: 14,
    fontFamily:"Montserrat-Regular",
    textAlign:"center",
    marginRight:10,
  },

})
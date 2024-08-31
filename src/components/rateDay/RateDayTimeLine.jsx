import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native'
import { getTranslation } from '../../utils'
import { useState, useEffect } from 'react'
import toAMorPM from '../../utils/AmPm'
import { Header } from '../Header'
import CheckBox from 'expo-checkbox'
import { useNavigate } from 'react-router-native'
import { currentDay, daysOfMonth } from '../../utils/constanst'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width} = Dimensions.get('window')

export function RateDayTimeLine ({tareas}) {

  const [open, setOpen] = useState(null);
  const [RatedTasks, setRatedTasks] = useState([]);
  const [listo, setListo] = useState(false);
  const navigator = useNavigate()

  useEffect(() => {
    if (!tareas) {
      return
    }
      
    let presetRatedHours = []
    tareas.map((tarea) => {
      presetRatedHours.push({calification: null, index:tarea.index, hours:tarea.hours.length})
    })
    setRatedTasks(presetRatedHours)
    
  }, [tareas])
  
  useEffect(() => {
    if (RatedTasks) {allIsCompleted()}
  },[RatedTasks])

  function allIsCompleted () {
    let listos = true
    RatedTasks.map((task) => {
      if (task.calification == null) {
        listos = false
      }
    })
    setListo(listos)
  }

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
  
  function handleOpen (index) {
    if (open !== index) {
      setOpen(index)
    } else {setOpen(null)}
  }

  function roundToNearest(value) {
    const roundingPoints = [0, 25, 50, 75, 100];
    return roundingPoints.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  }

  async function handlePress() {
    if (listo) {
      try {
        let storedCalifications = JSON.parse(await AsyncStorage.getItem('califications'));
  
        // Si no hay calificaciones almacenadas, las crea en base a un preset
        if (!storedCalifications) {
          storedCalifications = daysOfMonth;
          await AsyncStorage.setItem('califications', JSON.stringify(daysOfMonth));
          return;
        }
  
        // Verifica si todos los días tienen calificación definida
        const allDaysRated = storedCalifications.every(obj => obj.calification !== null);
  
        let finalCalifications = allDaysRated ? [...daysOfMonth] : [...storedCalifications];
  
        // Calcula el promedio de porcentaje de productividad de todo el día
        const totalHours = RatedTasks.reduce((sum, obj) => sum + obj.hours, 0);
        const weightedSum = RatedTasks.reduce((sum, obj) => sum + (obj.calification * obj.hours), 0);
        let average = totalHours === 0 ? 0 : weightedSum / totalHours;
  
        // Redondea el promedio a los valores más cercanos
        average = roundToNearest(average);
  
        // Actualiza la calificación del día actual (currentDay - 1)
        if (currentDay - 1 >= 0 && currentDay - 1 < finalCalifications.length) {
          finalCalifications[currentDay - 1] = { calification: average };
        } else {
          console.warn('La posición no coincide con el día actual.');
          navigator('/setDaily');
          return;
        }
  
        // Actualiza AsyncStorage con el contenido final
        await AsyncStorage.setItem('califications', JSON.stringify(finalCalifications));
        await AsyncStorage.setItem('ended', currentDay.toString());
        navigator('/setDaily');
      } catch (error) {
        console.error('Error al manejar el almacenamiento o cálculo:', error);
      }
    }
  }
  
  

function handleCalification(index, calification) {
  let newRatedTasks = [...RatedTasks];
  newRatedTasks[index].calification = calification;
  setRatedTasks(newRatedTasks); 
}
  
  return (
    <>
          <ScrollView>
    <Header text={getTranslation('month',1)}/>
    <View style={{alignItems: "center", paddingTop:50}}>
        {
          tareas && RatedTasks.length > 0 ? (
            tareas.map((tarea, index) => (
                <View key={index} style={styles.mainView}>
                    <View style={[styles.horas]}>
                      <Text style={styles.textHour} key={index}>{toAMorPM(tarea.hours[0])}</Text>
                    <View style={styles.bar}/>
                    </View>
                    <TouchableOpacity onPress={() => handleOpen(tarea.index)} style={{flexDirection:"row-reverse"}}>
                      <View key={tarea.hours[0]} style={[styles.heroView,{backgroundColor: tarea.color, height: calculateHeight(tarea.hours.length)}]}>
                          <Text style={{maxWidth:220, fontSize:18, fontFamily:"Montserrat-Bold"}}>{shortener(tarea.text, tarea.hours.length)}</Text>
                          <View style={{flexDirection:"row", width: 50, justifyContent:"space-between"}}>
                            <Text style={{fontFamily:"Montserrat-Regular", fontSize:17}}>{tarea.hours.length}h</Text>
                            <CheckBox
                              disabled={false}
                              value={RatedTasks[index].calification !== null}
                              style={styles.checkbox}
                            />
                          </View>

                      </View>
                      <View>
                        {tarea.hours.map((hour, index) => (
                            index !== 0 && (
                              <View key={index}>
                                <Text style={[styles.textHour, {marginTop: 60}]}>{toAMorPM(hour)}</Text>
                              </View>
                            )
                          ))}
                      </View>
                    </TouchableOpacity>
                    {open == tarea.index && (
                      <View style={{flexDirection:"row-reverse"}}>
                        <View style={styles.questionContainer}>
                          <Text style={{textAlign:"center", marginBottom:10}}>{getTranslation('question',0)}</Text>
                          <View  style={{flexDirection:"row", justifyContent:"space-around", width:"90%"}}>
                            <View><CheckBox value={RatedTasks[index].calification == 0} onValueChange={()=> handleCalification(index, 0)}/><Text style={{textAlign:"center"}}>0%</Text></View>
                            <View><CheckBox value={RatedTasks[index].calification == 25  } onValueChange={()=> handleCalification(index, 25  )}/><Text style={{textAlign:"center"}}>25%</Text></View>
                            <View><CheckBox value={RatedTasks[index].calification == 50  } onValueChange={()=> handleCalification(index, 50  )}/><Text style={{textAlign:"center"}}>50%</Text></View>
                            <View><CheckBox value={RatedTasks[index].calification == 75  } onValueChange={()=> handleCalification(index, 75  )}/><Text style={{textAlign:"center"}}>75%</Text></View>
                            <View><CheckBox value={RatedTasks[index].calification == 100 } onValueChange={()=> handleCalification(index, 100 )}/><Text style={{textAlign:"center"}}>100%</Text></View>
                          </View>
                        </View>
                      </View>

                    )}
                </View>


            )
          )
          ) : (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
              <ActivityIndicator />
            </View>
          )
        }

    </View>
    <View style={{height: 200,}}/>
    </ScrollView>
    <TouchableOpacity activeOpacity={listo ? 0.5 : 1} onPress={handlePress} style={[styles.button, {backgroundColor:listo?"#00d60e":"#c5c5c5"}]}>
      <Text style={{textAlign: "center", fontSize: 25, color:listo?"white":"#dedede", fontFamily: "Montserrat-Bold"}}>{getTranslation("daily", 0)}</Text>
    </TouchableOpacity>
    </>


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
  checkbox: {
    borderWidth: 0, // Quita el borde
    width: 24,
    height: 24, // Ajusta el tamaño del checkbox
  },

  questionContainer: {
    height: 120,
    backgroundColor: "#00000009",
    width: 300,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",
    margin: 7
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20
},

})
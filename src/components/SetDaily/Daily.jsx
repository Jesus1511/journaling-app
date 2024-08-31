import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import {useEffect, useState} from 'react'
import toAMorPM from '../../utils/AmPm'
import { getTranslation } from '../../utils/useLenguage'
import { useNavigate } from 'react-router-native'
import { CheckBox } from 'react-native-elements'
import { hourOfDayCustom } from '../../utils/constanst'
import AsyncStorage from '@react-native-async-storage/async-storage'
import separarIcon from '../../../assets/images/separarIcon.png'
import * as Crypto from 'expo-crypto';
import ColorsMenu from './ColorsMenu'
import { Header } from '../Header'

export const Daily = () => {

  const [hours, setHours] = useState(null);
  const [fusionButton, setFusionButton] = useState(false);
  const [listo, setlisto] = useState(false);
  const navigation = useNavigate()
  const [visible, setVisible] = useState(null);

  const randomKey = async () => {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    return [...randomBytes].map(b => b.toString(16).padStart(2, '0')).join('');
  };
  function handleColorInput (index) {
    if (visible == null || (visible !== null && visible !== index)) {
      setVisible(index)
    } else {
      setVisible(null)
    }
  }

  function handleText (event, indexs) {
      const text = event.nativeEvent.text
      const newHours = [...hours];
      hours.map((hour, index) => {
        if (hour.index == indexs) {
          newHours[index].text = text
        }
      })
      setHours(newHours)
  };

  function handleChecking (index) {
    let newHours = hours
    let found = false;
    for (let i = 0; i < hours.length; i++) {
      if (hours[i].index === index) {
        newHours[i].selected = !newHours[i].selected;
        found = true;
        break;
      }
    }
    if (found) {
      setHours([...newHours]);
      return
    }

  }

  async function handlePress () {
    if (listo) {
      navigation("/")
    }
  }

  function handleFusion() {
    if (fusionButton) {
      const selecteds = [];
      let startIndex = -1;
      let endIndex = -1;
      let startColor
      let startText

      // Encuentra los índices de la primera y última hora seleccionada
      hours.forEach((hour, index) => {
        if (hour.selected) {
          if (startIndex === -1) {
            startIndex = index;
            startColor = hour.color
            startText = hour.text
          }
          endIndex = index;
        }
      });

      // Si se encontraron horas seleccionadas, recopila las horas entre esos índices
      if (startIndex !== -1 && endIndex !== -1) {
        for (let i = startIndex; i <= endIndex; i++) {
          selecteds.push(hours[i].hours);
        }
      }

      // Aplana el arreglo de selecteds para evitar anidamientos
      const flattenedSelecteds = selecteds.flat();

      // Copia el array original
      let newHours = [...hours];

      // Elimina los elementos seleccionados
      flattenedSelecteds.forEach((selected) => {
        newHours = newHours.filter((hour) => !hour.hours.includes(selected));
      });

      // Añade el nuevo elemento donde se eliminaron los elementos
      newHours.splice(startIndex, 0, {
        hours: flattenedSelecteds,
        selected: false,
        text: startText,
        color: startColor,
        index: ramdonKey()
      });

      setHours(newHours);
    }
  }

  async function handleDivide(index) {
    let newHours = [...hours];
    const storedDayStart = parseInt(await AsyncStorage.getItem('dayStart'));
  
    const combinedObject = newHours.find((hour) => hour.index === index);
  
    if (combinedObject && Array.isArray(combinedObject.hours)) {
      // Elimina el objeto combinado del array
      newHours = newHours.filter((hour) => hour.index !== index);
  
      // Divide los objetos respetando el orden de la propiedad 'hours'
      const separatedHours = combinedObject.hours.map((hourValue) => ({
        hours: [hourValue], // Asegurarse de que 'hours' sea un array
        selected: false,
        text: combinedObject.text,
        color: combinedObject.color,
        index: ramdonKey() // Clave única para cada elemento
      }));
  
      // Añadir los objetos divididos nuevamente al array
      newHours.splice(index, 0, ...separatedHours);
  
      // Ordenar los objetos comenzando desde `storedDayStart`
      newHours.sort((a, b) => {
        const aValue = Array.isArray(a.hours) ? a.hours[0] : a.hours;
        const bValue = Array.isArray(b.hours) ? b.hours[0] : b.hours;
  
        // Calcula la distancia desde `storedDayStart` para ordenar
        const distanceA = (aValue - storedDayStart + 24) % 24;
        const distanceB = (bValue - storedDayStart + 24) % 24;
  
        return distanceA - distanceB;
      });
  
      setHours(newHours); // Actualizar el estado con los objetos ordenados
    }
  }
  
  useEffect(() => {
    async function a () {

      let presetHours = []
      let storedDayStart = parseInt(await AsyncStorage.getItem('dayStart'))
      const hoursOfDay = hourOfDayCustom(storedDayStart)
      hoursOfDay.map((hour) => {
        presetHours.push({index: randomKey(), hours: [hour], text: "", selected: false, color: "#dedede",})
      })
      let storedHours = JSON.parse(await AsyncStorage.getItem('hours'))
      if (!storedHours || storedHours.length <= 0) {
        storedHours = presetHours
      }
      setHours(storedHours)
    }
    a()
  },[])

  useEffect(() => {
    async function a () {
      if (hours) { await AsyncStorage.setItem('hours', JSON.stringify(hours)); }
    }; a()
    if (hours) {isTwoSelected();}
    if (hours) {allIsCompleted()}

  },[hours])

  function isTwoSelected () {
    let selecteds = 0
    hours.map((hour) => {
      if (hour.selected) {
        selecteds++
      } if (selecteds >= 2) {
        setFusionButton(true)
        return
      }
    })
    setFusionButton(selecteds >= 2);
  }

  function allIsCompleted () {
    let listos = true
    hours.map((hour) => {
      if (hour.text == "") {
        listos = false
      }
    })
    setlisto(listos)
  }

  if (hours == null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <>
      <ScrollView >
        <Header text={getTranslation('daily', 2)}/>

        {hours.map((hour, index) => (
          <View style={{padding: 15}} key={index}>
            {visible == hour.index && (
              <ColorsMenu hour={hour} setVisible={setVisible} setHours={setHours} hours={hours}/>        
              )}
            <View>
              <Text>{toAMorPM(hour.hours[0])}</Text>
              <View style={styles.bar}/>
            </View>

            <View style={[styles.iconsContainer,{backgroundColor:hour.color, marginVertical:4}]}>
              <View style={styles.horasContainer}>
                {hour.hours.map((hours, index) => (
                  index !== 0 && (
                      <Text style={[styles.textHour, {marginBottom: 60}]}>{toAMorPM(hours)}</Text>
                  )
                ))}
              </View>
              <TextInput
                value={hour.text} style={{width:155, marginRight: 15}}
                placeholder={getTranslation("today", 6)} defaultValue={hour.text}
                onChange={(e) => {handleText(e, hour.index)}} returnKeyType="done"/>

              <View style={{flexDirection:"row-reverse", alignItems:"center"}}>
                <CheckBox checked={hour.selected} onPress={()=>handleChecking(hour.index)}/>
                <TouchableOpacity style={[styles.colorButton, {backgroundColor:hour.color}]} onPress={()=>handleColorInput(hour.index)}/>
                <View style={{width: 15, height:25, marginRight: 20}}>
                {hour.hours.length >= 2 && (
                    <TouchableOpacity onPress={() => handleDivide(hour.index)}>
                      <Image style={{width: 15, height: 25,}} source={separarIcon} />
                    </TouchableOpacity>
                )}
                </View>
              </View>
            </View>
            
          </View>
        ))}
        <View style={{height: 250,}}/>
      </ScrollView>

      <TouchableOpacity activeOpacity={fusionButton ? 0.5 : 1} onPress={handleFusion}  style={[styles.buttonFusion, {backgroundColor:fusionButton?"blue":"#c5c5c5"}]}>
        <Text style={{textAlign: "center", fontSize: 25, color:fusionButton?"white":"#dedede", fontFamily: "Montserrat-Bold"}}>{getTranslation("daily", 1)}</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={listo ? 0.5 : 1} onPress={handlePress} style={[styles.button, {backgroundColor:listo?"#00d60e":"#c5c5c5"}]}>
        <Text style={{textAlign: "center", fontSize: 25, color:listo?"white":"#dedede", fontFamily: "Montserrat-Bold"}}>{getTranslation("daily", 0)}</Text>
      </TouchableOpacity>
      </>

    )
  }


}


const styles = StyleSheet.create({
    button: {
        width: 120,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        right: 20
    },
    buttonFusion: {
      width: 120,
      height: 40,
      borderRadius: 5,
      justifyContent: "center",
      position: "absolute",
      bottom: 75,
      right: 20
  },
    iconsContainer: {
      flexDirection: "row",
      alignItems:"center",
      zIndex:0,
    },
    bar:{
      height:1,
      width: "100%",
      backgroundColor: "#000000"
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    textHour: {
      fontSize: 14,
      fontFamily:"Montserrat-Regular",
      textAlign:"center",
      marginRight:10,
    },
    horasContainer: {
      paddingTop: 50,
      width: 55,
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
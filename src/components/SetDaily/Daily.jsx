import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native'
import {useEffect, useState} from 'react'
import toAMorPM from '../../utils/AmPm'
import { getTranslation } from '../../utils/useLenguage'
import { useNavigate } from 'react-router-native'
import { CheckBox } from 'react-native-elements'
import { hoursOfDay } from '../../utils/constanst'
import AsyncStorage from '@react-native-async-storage/async-storage'
import separarIcon from '../../../assets/images/separarIcon.png'

export const Daily = () => {

  const [hours, setHours] = useState(null);
  const [fusionButton, setFusionButton] = useState(false);
  const [listo, setlisto] = useState(false);

  const navigation = useNavigate()

  function handleSubmit (event, indexs) {
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

  function handlePress () {
    navigation("/setDaily")
  }

  function handleFusion() {
    if (fusionButton) {
      const selecteds = [];
      let startIndex = -1;
      let endIndex = -1;
  
      // Encuentra los índices de la primera y última hora seleccionada
      hours.forEach((hour, index) => {
        if (hour.selected) {
          if (startIndex === -1) {
            startIndex = index;
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
        text: "", 
        color: "white",
        index: startIndex
      });
  
      setHours(newHours);
    }
  }
  
  function handleDivide(index) {
    let newHours = [...hours];

    const combinedObject = newHours.find((hour) => hour.index === index);
  
    if (combinedObject && Array.isArray(combinedObject.hours)) {
      newHours = newHours.filter((hour) => hour.index !== index);
      const separatedHours = combinedObject.hours.map((hourValue, idx) => ({
        hours: [hourValue],  // Convertirlo en un array para mantener consistencia
        selected: true,
        text: "",
        color: "white",
        index: index + idx
      }));
  
      newHours.splice(index, 0, ...separatedHours);
  
      setHours(newHours)
    }
  }
  
  useEffect(() => {
    async function a () {
      let presetHours = []
      hoursOfDay.map((hour, index) => {
        presetHours.push({index: index, hours: [hour], text: "", selected: false, color: "white",})
      })
      const storedHours = JSON.parse(await AsyncStorage.getItem('hours')) || presetHours
      setHours(storedHours)
    }
    a()
  },[])

  useEffect(() => {
    async function a () {
      if (hours) {
       await AsyncStorage.setItem('hours', JSON.stringify(hours))
      }
    }
    a()

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
        <Text>
          Loading
        </Text>
      </View>
    )
  } else {
    return (
      <>
      <ScrollView style={{padding: 15}}>
        <View style={{height: 35,}}/>
        
        {hours.map((hour, index) => (
          
          <View key={index}>
            <View>
              <Text>
                  {toAMorPM(hour.hours[0])}
              </Text>
              <View style={styles.bar}/>
            </View>
      
            <View style={[styles.iconsContainer,{height: hour.hours.length*60, cbackgroundColor:hour.selected?"#dedede":"white"}]}>
              <TextInput
                style={{marginRight:hour.hours.length <= 1?50:75}}
                placeholder={getTranslation("today", 6)}
                defaultValue={hour.text}
                onSubmitEditing={(event) => handleSubmit(event, hour.index)}
                returnKeyType="done"/>

              {hour.hours.length >= 2 && (
                <TouchableOpacity onPress={() => handleDivide(hour.index)} style={{marginRight: 27}}>
                  <Image style={{width: 15, height: 25,}} source={separarIcon} />
                </TouchableOpacity>
              )}

              <CheckBox 
                  checked={hour.selected}
                  onPress={()=>handleChecking(hour.index)}/>


              
              
              
            </View>
          </View>
        ))}
        <View style={{height: 150,}}/>
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
      justifyContent: "flex-end",
      alignItems:"center"
    },
    bar:{
      height:1,
      width: "100%",
      backgroundColor: "#000000"
    }
})
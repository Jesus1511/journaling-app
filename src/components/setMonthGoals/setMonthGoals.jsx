import { StyleSheet, Text, View, TextInput, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { getTranslation } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './Task';
import { useNavigate } from 'react-router-native';
import {Header} from '../Header'

const {width} = Dimensions.get('window')

const setMonthGoals = () => {
    const [value, setValue] = useState("");
    const [importance, setImportance] = useState(1);
    const [secundaryGoals, setSecundaryGoals] = useState(null);
    const [listo, setListo] = useState(false)
    const navigation = useNavigate()

    const ramdonKey = async () => {
      return uuidv4();
    };

    const generatePickerItems = () => {

        let valueOptions = [
            { label: '1ª', value: 1 },
            { label: '2ª', value: 2 },
            { label: '3ª', value: 3 }
          ];

        secundaryGoals.map((goal) => {
            valueOptions.map((option, index) => {
                if (goal.importance == option.value) {
                    valueOptions.splice(index, 1);
                }
            })
        })

      return valueOptions
    };

    useEffect(() => {
        if (!secundaryGoals) {
            return
        } 
        const s = generatePickerItems()
        if (s.length > 0) {
            setImportance(s[0].value)
        }

        if (secundaryGoals.length >= 3) {
            setListo(true)
        } else {setListo(false)}
      }, [secundaryGoals]);

    async function handleSubmit() {
      if (value === "" || importance === null) {
        return;
      }
      if (secundaryGoals.length >= 3) {
        alert('Solo puedes crear 3 tareas.');
        return;
      }
      const newElement = { text: value, importance: importance, index: ramdonKey() };
      const newGoals = [...secundaryGoals, newElement].sort((a, b) => a.importance - b.importance); // Ordenar por importancia
      setSecundaryGoals(newGoals);
      setValue("");
      setImportance(null); // Reiniciar la importancia

      await AsyncStorage.setItem('month', JSON.stringify(newGoals));
    }

    async function handleDeleted(taskIndex) {
      const updatedGoals = secundaryGoals.filter(goal => goal.index !== taskIndex);
      setSecundaryGoals(updatedGoals);
      await AsyncStorage.setItem('month', JSON.stringify(updatedGoals));
    }

    useEffect(() => {
      async function loadGoals() {
        const storedGoals = await AsyncStorage.getItem('month');
        if (storedGoals) {
          setSecundaryGoals(JSON.parse(storedGoals));
        } else {
          setSecundaryGoals([]);
        }
      }
      loadGoals();
    }, []);

    if (secundaryGoals == null) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const incompleteGoals = secundaryGoals.filter(goal => !goal.complete);

      return (
        <>
          <Header text={getTranslation('month', 0)}/>
          <View style={{ alignItems: "center", marginTop: 20, marginBottom: 60 }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={value}
                placeholder={getTranslation("today", 6)}
                onChangeText={text => setValue(text)}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                editable={secundaryGoals.length < 3}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={{marginTop:17}}>{importance}°</Text>
                <RNPickerSelect
                  onValueChange={(value) => setImportance(value)}
                  items={generatePickerItems()}
                  value={importance}
                  style={{ ...pickerSelectStyles }}
                  placeholder={{ label: 'Selecciona la importancia', value: null }}
                />
              </View>
            </View>

            <Task complete={false} handleDeleted={handleDeleted} tareas={incompleteGoals} />


          </View>
          <TouchableOpacity activeOpacity={listo ? 0.5 : 1} onPress={()=>{listo && navigation('/')}} style={[styles.button, {backgroundColor:listo?"#00d60e":"#c5c5c5"}]}>
            <Text style={{textAlign: "center", fontSize: 25, color:listo?"white":"#dedede", fontFamily: "Montserrat-Bold"}}>{getTranslation("daily", 0)}</Text>
          </TouchableOpacity>
        </>
      );
    }
}

export default setMonthGoals


const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      fontFamily: "Montserrat-Bold",
      marginTop: 30,
      marginBottom: 15,
    },
    input: {
      marginBottom: 10,
      marginHorizontal: 20,
      textAlignVertical: 'center',
      marginTop:10,
    },
    inputContainer: {
      flexDirection: "row",
      padding: 20,
      width,
      justifyContent: "center"
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
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });
  
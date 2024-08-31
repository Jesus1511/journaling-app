import { StyleSheet, Text, View, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { Task } from './Task';
import { getTranslation } from '../../utils';
import * as Crypto from 'expo-crypto';


const {width} = Dimensions.get("window");

export const SecundaryGoals = () => {
  const [value, setValue] = useState("");
  const [importance, setImportance] = useState(10); // Inicializamos el porcentaje de importancia
  const [secundaryGoals, setSecundaryGoals] = useState(null);

  const randomKey = async () => {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    return [...randomBytes].map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const calculateTotalImportance = () => {
    // Sumamos la importancia de todas las tareas, independientemente de si están completas o no
    return secundaryGoals?.reduce((total, goal) => total + goal.importance, 0) || 0;
  };
  const availableImportance = 100 - calculateTotalImportance();

  const generatePickerItems = () => {
    let items = [];
    for (let i = 10; i <= availableImportance; i += 5) {
      items.push({ label: `${i}%`, value: i });
    }
    return items;
  };

  async function handleSubmit() {
    if (value == "") {
      return
    }
    const newElement = { text: value, importance: importance, index: randomKey(), complete: false };
    const newGoals = [...secundaryGoals, newElement].sort((a, b) => b.importance - a.importance); // Ordenar por importancia
    setSecundaryGoals(newGoals);
    setValue("");
    setImportance(10); // Reiniciar el porcentaje de importancia

    await AsyncStorage.setItem('secundaryGoals', JSON.stringify(newGoals));
  }

  async function handleCompleted(taskIndex) {
    const updatedGoals = secundaryGoals.map(goal =>
      goal.index === taskIndex ? { ...goal, complete: !goal.complete } : goal
    );
    setSecundaryGoals(updatedGoals);
    await AsyncStorage.setItem('secundaryGoals', JSON.stringify(updatedGoals));
  }
  

  async function handleDeleted(taskIndex) {
    const updatedGoals = secundaryGoals.filter(goal => goal.index !== taskIndex);
    setSecundaryGoals(updatedGoals);
    await AsyncStorage.setItem('secundaryGoals', JSON.stringify(updatedGoals));
  }

  useEffect(() => {
    async function loadGoals() {
      const storedGoals = await AsyncStorage.getItem('secundaryGoals');
      if (storedGoals) {
        setSecundaryGoals(JSON.parse(storedGoals));
      } else {
        setSecundaryGoals([]);
      }
    }
    loadGoals();
  }, []);

  useEffect(() => {
    if (importance < 10 && calculateTotalImportance() < 100) {
      setImportance(10)
    }
  }, [value]);

  if (secundaryGoals == null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else {
    const incompleteGoals = secundaryGoals.filter(goal => !goal.complete);
    const completedGoals = secundaryGoals.filter(goal => goal.complete);

    return (
      <>
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 60 }}>
          <Text style={styles.text}>{getTranslation('today', 5)}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={value}
              placeholder={getTranslation("today", 6)}
              onChangeText={text => setValue(text)}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              editable={availableImportance > 0}
            />
            <View style={{flexDirection: "row"}}>
              <Text style={{textAlignVertical: 'center',}}>{importance}%</Text>
              <RNPickerSelect
                onValueChange={(value) => setImportance(value)}
                items={generatePickerItems()}
                value={importance} // El valor actual
                style={{ ...pickerSelectStyles }}
                placeholder={{ label: 'Select importance', value: null }}
              />
            </View>
          </View>
          {availableImportance <= 0 && (<Text>{getTranslation("today", 8)}</Text>)}

          <Task complete={false} handleDeleted={handleDeleted} handleCompleted={handleCompleted} tareas={incompleteGoals} />
          <Task complete={true} handleDeleted={handleDeleted} handleCompleted={handleCompleted} tareas={completedGoals} />
        </View>
      </>
    );
  }
};

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
  }
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

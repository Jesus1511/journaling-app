import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Header, Hero, TimeLine } from '../components/Today';

const { width, height } = Dimensions.get("window");

const tareas = [
  { horas: [1, 2, 3], color: "red", name: "dormir", notificacion: true },
  { horas: [4], color: "red", name: "despertar, tomar café y caminar", notificacion: true },
  { horas: [5, 6], color: "red", name: "trabajar en la aplicación", notificacion: true },
  { horas: [7], color: "blue", name: "desayunar", notificacion: true },
  { horas: [8, 9], color: "green", name: "revisar emails y mensajes", notificacion: true },
  { horas: [10, 11], color: "yellow", name: "reuniones o trabajo en proyectos", notificacion: true },
  { horas: [12], color: "orange", name: "almorzar", notificacion: true },
  { horas: [13, 14], color: "green", name: "trabajar en tareas pendientes", notificacion: true },
  { horas: [15], color: "blue", name: "pausa y estiramiento", notificacion: false },
  { horas: [16, 17], color: "purple", name: "trabajar en la aplicación", notificacion: true },
  { horas: [18], color: "orange", name: "cena", notificacion: true },
  { horas: [19, 20], color: "green", name: "ejercicio o caminar", notificacion: true },
  { horas: [21], color: "red", name: "lectura o aprendizaje", notificacion: true },
  { horas: [22], color: "blue", name: "relajarse o ver una serie", notificacion: false },
  { horas: [23, 24], color: "purple", name: "prepararse para dormir", notificacion: true }
];


const TodayScreen = () => {
  return (
    <ScrollView style={[styles.mainView]}>
      <Header />
      <Hero tarea={tareas[0]}/>
      <TimeLine tareas={tareas}/>
      <View style={{height: 250,}}/>
    </ScrollView>
  )
}

export default TodayScreen

const styles = StyleSheet.create({

    mainView: {
        width,
    }

})
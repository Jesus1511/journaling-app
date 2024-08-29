import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { RateDayTimeLine } from "./RateDayTimeLine"
import AsyncStorage from "@react-native-async-storage/async-storage"

const RateDay = () => {
    
    const [tareas, setTareas] = useState(null)

    useEffect(() => {
      cargarTareas()
    }, [])
    
    async function cargarTareas () {
        const newTareas = JSON.parse(await AsyncStorage.getItem('hours'))
        if (!newTareas || newTareas.length == 0) {
          navigator('/setDaily')
          return
        }
        setTareas(newTareas)
    }


  return (
    <>
      <RateDayTimeLine tareas={tareas}/>
    </>
  )
}

export default RateDay

const styles = StyleSheet.create({})
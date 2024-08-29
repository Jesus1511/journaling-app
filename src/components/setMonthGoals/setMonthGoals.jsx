import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../Header'
import { getTranslation } from '../../utils'

const setMonthGoals = () => {
  return (
    <View>
     <Header text={getTranslation('month',0)}/>
    </View>
  )
}

export default setMonthGoals

const styles = StyleSheet.create({})
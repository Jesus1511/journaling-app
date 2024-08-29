import { StyleSheet, Text, View, StatusBar, ActivityIndicator} from 'react-native'
import { useState, useEffect } from 'react'
import MainScreen from './src/Navigation/MainScreen'
import {loadFonts, initializeLanguage} from './src/utils'
import { NativeRouter, Routes, Route } from 'react-router-native';
import SetDaily from './src/Navigation/SetDaily';
import setMonthGoals from './src/components/setMonthGoals/setMonthGoals';

const App = () => {

    const [LanguageLoaded, setLanguageLoaded] = useState(false)
    const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
      const loadApp = async () => {
        await loadFonts();
        await initializeLanguage();
        setLanguageLoaded(true);
        setFontsLoaded(true);
      };
      loadApp();
    }, []);

    if (!LanguageLoaded || !fontsLoaded) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <NativeRouter>
          <StatusBar barStyle="light-content" backgroundColor="#f7f7f7" />
          <Routes>
            <Route path='/'         element={<MainScreen />} />
            <Route path='/setDaily' element={<SetDaily />}   />
            <Route path='/setMonth' element={<setMonthGoals />}   />
          </Routes>
        </NativeRouter>
      )
    }
}

export default App

const styles = StyleSheet.create({})
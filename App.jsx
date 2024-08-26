import { StyleSheet, Text, View, StatusBar } from 'react-native'
import {useState, useEffect} from 'react'
import MainScreen from './src/Navigation/MainScreen'
import {loadFonts, initializeLanguage} from './src/utils'
import { NativeRouter, Routes, Route, useNavigate } from 'react-router-native';
import SetDaily from './src/Navigation/SetDaily';

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
            <Text>
              Loading
            </Text>
        </View>
      )
    } else {
      return (
        <NativeRouter>
          <StatusBar barStyle="light-content" backgroundColor="#f7f7f7" />
          <Routes>
            <Route path='/setDaily'         element={<MainScreen />} />
            <Route path='/' element={<SetDaily />} />
          </Routes>
        </NativeRouter>
      )
    }
}

export default App

const styles = StyleSheet.create({})
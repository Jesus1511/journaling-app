import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MainScreen from './src/Navigation/MainScreen';
import { loadFonts, initializeLanguage } from './src/utils';
import { NativeRouter, Routes, Route } from 'react-router-native';
import SetDaily from './src/Navigation/SetDaily';
import SetMonthGoals from './src/components/setMonthGoals/SetMonthGoals';
import RateDay from './src/components/rateDay/RateDay';
import Notifications from './src/components/Notifications';
import AppGuide from './src/components/AppGuide/AppGuide';
import * as Sentry from '@sentry/react-native'; // Importar Sentry
import Constants from 'expo-constants';         // Importar Constants de Expo

// Inicializar Sentry
Sentry.init({
  dsn: 'https://bbb82d4feed59dfbee68707d2cfabdb0@o4507821224624128.ingest.us.sentry.io/4507873004224512', // Reemplaza con tu DSN de Sentry
  enableInExpoDevelopment: true,
  debug: true,  // Esto es opcional, puedes usarlo en modo de desarrollo
});


const App = () => {
  const [LanguageLoaded, setLanguageLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      try {
        await loadFonts();
        await initializeLanguage();
        setLanguageLoaded(true);
        setFontsLoaded(true);
      } catch (error) {
        Sentry.captureException(error); // Capturar cualquier error
      }
    };
    loadApp();
  }, []);

  if (!LanguageLoaded || !fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <NativeRouter>
        <StatusBar barStyle="light-content" backgroundColor="#f7f7f7" />
        <Notifications>
          <Routes>
            <Route path='/'         element={<MainScreen />}   />
            <Route path='/setDaily' element={<SetDaily />}     />
            <Route path='/setMonth' element={<SetMonthGoals />} />
            <Route path='/rateDay'  element={<RateDay />}      />
            <Route path='/appguide' element={<AppGuide />}     />
          </Routes>
        </Notifications>
      </NativeRouter>
    );
  }
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({});

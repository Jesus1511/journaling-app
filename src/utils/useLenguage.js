import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';


const translations = {
  es: {
    today: ["Hoy",   "Ahora deberias estar...", "para hoy", "Este mes", "Metas del mes", "Tareas Diarias", "+  añadir elemento", 'Seleccionar importancia', 'Tu día esta 100% ocupado'],
    daily: ["Listo", "Unir"],
    menu:  ["Editar horario", "Editar Tareas", "Cambiar idioma"],
    month: ["Define tus metas para este mes"]

  },
  en: {
    today: ["Today", "right now you should be...", "for today", "This month", "Month Goals", "Daily Tasks", "+  add element", 'Select importance','Your day is 100% busy'],
    daily: ["Done", "Link"],
    menu:  ["Edit Calendar", "Edit Tasks", "Change Idiom"],
    month: ["Define your goals for this month"]

  },
};

let userLenguaje;

export async function initializeLanguage() {
  try {
    const value = await AsyncStorage.getItem('language');
    if (value === null) {
      let userLanguage = Localization.locale.substring(0, 2); // Obtenemos el idioma del dispositivo
      if (!['en', 'es'].includes(userLanguage)) {
        userLanguage = 'en'; // Establecemos inglés como idioma predeterminado si no es ni 'en' ni 'es'
      }
      await AsyncStorage.setItem('language', userLanguage);
      userLenguaje = userLanguage;
    } else {
      userLenguaje = value;
      return true;
    }
  } catch (error) {
    console.error('Error al inicializar el lenguaje:', error);
    await AsyncStorage.setItem('language', 'en');
    userLenguaje = 'en';
  } finally {
    return true;
  }
}

export function getTranslation(section, index) {
  const translation = translations[userLenguaje]?.[section]?.[index];
  if (!translation) {
    console.error('Traducción no encontrada para', section, index);
    return 'papaya';
  } else {
    return translation;
  }
}

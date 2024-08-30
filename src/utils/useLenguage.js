import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';


const translations = {
  es: {
    today: ["Hoy",   "Ahora deberias estar...", "para hoy", "Este mes", "Metas del mes", "Tareas Diarias", "+  añadir elemento", 'Seleccionar importancia', 'Tu día esta 100% ocupado'],
    daily: ["Listo", "Unir", "Planifica tu día"],
    menu:  ["Editar horario", "Cambiar hora de control", "Cambiar idioma", "Hora de Despertar"],
    month: ["Metas del Mes", "Califica el Día", "vacio"],
    question: ["¿Que tan productivo fuiste en este bloque de tiempo?"],
    noti: ["it is", "It's time to organize tomorrow"],
    slides: ["Bienvenido a Trackiu!!", "En Trackiu puedes organizar y hacer seguimiento de tu productividad diaria, anotar tus tareas y cumplir tu objetivos",
            "Puedes Definir lo que planeas hacer cada una de las 24h del día y luego darle un porcentaje según lo productivo o no que fuiste en este periodo de tiempo", "¿A que hora te sueles levantar"
    ]

  },
  en: {
    today: ["Today", "right now you should be...", "for today", "This month", "Month Goals", "Daily Tasks", "+  add element", 'Select importance','Your day is 100% busy'],
    daily: ["Done", "Link", "Plan your Day"],
    menu:  ["Edit Calendar", "Change Rating hour", "Change Idiom", "Waking up hour"],
    month: ["Month Goals", "Rate the Day", "null"],
    question: ["How productive you were in this block of time?"],
    noti: ["Son Las", "Es hora de organizar el día de mañana"]

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

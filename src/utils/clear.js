import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clear () {
    try {
        await AsyncStorage.clear();
        console.log('Todos los datos en AsyncStorage han sido eliminados.');
      } catch (error) {
        console.error('Error al eliminar los datos de AsyncStorage:', error);
      }
}
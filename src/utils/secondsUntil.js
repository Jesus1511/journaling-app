export function getSecondsUntil(hour, minute) {
    // Validar los parámetros
    if (hour < 1 || hour > 24 || minute < 1 || minute > 60) {
      throw new Error('Hora debe estar entre 1 y 24, y minutos entre 1 y 60');
    }
  
    // Obtener la fecha y hora actuales
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
  
    // Calcular el tiempo en segundos desde el inicio del día para la hora actual
    const currentTotalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
  
    // Calcular el tiempo en segundos desde el inicio del día para la hora objetivo
    const targetTotalSeconds = (hour - 1) * 3600 + (minute - 1) * 60;
  
    // Calcular los segundos faltantes
    const secondsUntilTarget = targetTotalSeconds - currentTotalSeconds;
  
    return secondsUntilTarget > 0 ? secondsUntilTarget : (24 * 3600 - currentTotalSeconds) + targetTotalSeconds;
  }
  
  
export const hoursOfDay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
export const colors = [["#ff770085", "#ff000085"],["#dedede", "#1aff0085"],[ "#0080ff85", "#a600ff85"],[ "#ff3cd885", "#ffea00"]]

export function hourOfDayCustom(startNumber) {
  if (startNumber < 1 || startNumber > 24) {
    throw new Error('El número debe estar entre 1 y 24');
  }

  const firstPart = Array.from({ length: 25 - startNumber }, (_, i) => startNumber + i);

  const secondPart = Array.from({ length: startNumber - 1 }, (_, i) => i + 1);

  return [...firstPart, ...secondPart];
}



function getDaysArrayForCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Los meses empiezan desde 0 en JS
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtiene la cantidad de días del mes
    const today = now.getDate(); // Obtiene el día actual del mes
  
    // Genera el array con objetos
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1; // Día del mes, desde 1 hasta el total de días
      return {
        day: day,
        calification: day < today ? 0 : null // Asigna 0 a días pasados, null al día actual y futuros
      };
    });
  
    return daysArray;
  }

export const daysOfMonth = getDaysArrayForCurrentMonth();
  

function getCurrentHour() {
    const now = new Date();
    let hour = now.getHours(); // Obtiene la hora actual en formato 24 horas (0 a 23)
    
    // Convierte la hora a un rango de 1 a 24
    hour = hour === 0 ? 24 : hour; // Si es medianoche (0), considera como 24
    
    return hour;
  }

export const currentHour = getCurrentHour();


function getCurrentDay() {
  const now = new Date();
  const day = now.getDate(); // Obtiene el día del mes (1 a 28, 30 o 31)
  
  return day;
}

export const currentDay = getCurrentDay();

  
  
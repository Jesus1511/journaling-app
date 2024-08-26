export default function toAMorPM(hora) {
    if (hora === 0) {
      return "12a.m";  // Medianoche
    } else if (hora === 12) {
      return "12p.m";  // Mediodía
    } else if (hora > 12) {
      return (hora - 12).toString().concat("p.m");
    } else {
      return hora.toString().concat("a.m");
    }
  }
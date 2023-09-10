
export function WindCalc(deg) {             // turning degrees from API into a direction
  let directions = ["N", "NNE", "NE", "ENE", "E",
    "ESE", "SE", "SSE", "S",
    "SSW", "SW", "WSW", "W",
    "WNW", "NW", "NNW"];
  let section = parseInt(deg / 22.5 + 0.5);
  section = section % 16;
  console.log(directions[section])


  return directions[section]
}    
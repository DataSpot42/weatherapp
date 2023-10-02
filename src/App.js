import { React, useState} from "react"
import { WeatherLocation, WeatherTemps, WeatherDetail, WeatherWind, WeatherForcast } from "./componants/weatherText"
import PlaceComponent from "./componants/locationsearch";
import { motion } from "framer-motion";
import './App.css'

let isLoading = false   // setting to hide weather blocks until data obtained
const App = () => {
  let [geo, setGeo] = useState("0");
  const childToParent = (childData) => {   // got location data from locationsearch componant 
    setGeo(childData);
    console.log(geo);
  }

  const [weather, setWeather] = useState([{ "name": "." }])
  const [mainTemp, SetMainTemp] = useState([{ "temp": "Awaiting Input" }])
  const [chosenWeather, setChosenWeather] = useState('')
  const [chosenWind, setChosenWind] = useState('')
  const [chosenLocation, setChosenLocation] = useState('')
  const [chosenForecast, setChosenForecast] = useState([])      // setting required varibles
  /* const [key, setKey] = useState(0); */
  let ffs=weather
  console.log(ffs)
 
  const handlerFindWeather = async (geo) => {   // taking location data to get weather report

    console.log(geo)
    const API_KEY = process.env.REACT_APP_API_KEY
    let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&units=metric&appid=${API_KEY}`)
    let data2 = await response2.json()      // forecast for now
    let response3 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0]}&lon=${geo[1]}&units=metric&appid=${API_KEY}`)
    let data3 = await response3.json()   // forecast for next 5 days
    setChosenForecast(data3)
    setWeather(data2.weather)
    SetMainTemp(data2.main)
    setChosenLocation(data2)
    setChosenWeather(data2.weather[0])   //formatting the data for each part of the forecast
    setChosenWind(data2.wind)
    console.log(chosenForecast)
    console.log(data2)
    console.log(mainTemp)
    isLoading = true   //revealing weather blocks now data obtained
  }

 /*  const handleSelectedlocation = (geo, e) => {
    e.preventDefault()
    handlerFindWeather(geo)         // stopping constant polling of data
  }; */
  return (
    <div className="whole">
      <div className="findWeather">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} h2>Weather App</motion.h2>
      <PlaceComponent childToParent={childToParent} />     {/* box and button to get location */}
      <motion.button /* key={key} */ initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
        className="button" onClick={(e) => (handlerFindWeather(geo, e.target.value))}>Get Weather</motion.button>
      </div>
      {isLoading ?        // conditional rendering, revealing blocks once data obtained
        <><div className="weatherMain">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="weatherBlock" >

            <div className="weatherNow"><WeatherTemps {...mainTemp} /></div>
            <div className="weatherNow"><WeatherDetail {...chosenWeather} /></div>
            <div className="weatherNow"><WeatherWind {...chosenWind} /></div>
            <div className="weatherNow"><WeatherLocation {...chosenLocation}{...isLoading} /></div>    {/* current weather */}


          </motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <h2><WeatherForcast chosenForecast={chosenForecast} /></h2>       {/* forecast */}
          </motion.div>
        </div>
        </>           
        : <motion.h2 className="findWeather" initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        transition={{ ease: "linear", duration: .5, repeat: Infinity, repeatType: "reverse" }} 
        h2>Awaiting Input</motion.h2>}     {/* shown until data obtained */}

    </div>
  )
}

export default App

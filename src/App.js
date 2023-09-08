import { React, useState, useEffect, useContext, useRef } from "react"
import { WeatherInfo1, WeatherInfo2, WeatherInfo3, WeatherInfo4, WeatherForcast } from "./componants/weatherText"
import PlaceComponent from "./componants/locationsearch";
import { motion } from "framer-motion";

import './App.css'
let isLoading = false
const App = () => {
  let [geo, setGeo] = useState("0");
  const childToParent = (childData) => {
    setGeo(childData);
    console.log(geo);
  }
  const defaulttown = 'London'
  
  
  const [location, setLocation] = useState([])
  const [town, setTown] = useState('London')
  const [weather, setWeather] = useState([{ "name": "." }])
  const [mainTemp, SetMainTemp] = useState([{ "temp": "Awaiting Input" }])
  const [chosenWeather, setChosenWeather] = useState('')
  const [chosenWind, setChosenWind] = useState('')
  const [chosenLocation, setChosenLocation] = useState('')
  const [chosenForecast, setChosenForecast] = useState([])
  const [key, setKey] = useState(0);

  const handlerFindWeather = async (geo) => {
    
    console.log(geo)
    const API_KEY = process.env.REACT_APP_API_KEY
    let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&units=metric&appid=${API_KEY}`)
    let data2 = await response2.json()
    let response3 =await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0]}&lon=${geo[1]}&units=metric&appid=${API_KEY}`) 
    let data3 = await response3.json()
    
    console.log(data3)
    setChosenForecast(data3)
    setWeather(data2.weather)
    SetMainTemp(data2.main)
    setChosenLocation(data2)
    setChosenWeather(data2.weather[0])
    setChosenWind(data2.wind)
    console.log(chosenForecast)
    console.log(data2.main)
    
    
    console.log(chosenForecast)
    console.log(data2)
    console.log(mainTemp)
    isLoading = true

  }

  const handleSelectedlocation = (geo, e) => {
    e.preventDefault()
    console.log(geo)
    handlerFindWeather(geo)
  };
 
  console.log(geo)
  return (
    <div class="whole">
      <motion.h2 initial={{opacity:0}} animate={{opacity: 1}} h2>Weather App</motion.h2>
      <PlaceComponent childToParent={childToParent} />
      <motion.button key={key} initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2}} className="button" onClick={(e) => (handlerFindWeather(geo, e.target.value))}>Get Weather</motion.button>
      {isLoading ?
       <>
        <motion.div initial={{scale: 0}} animate={{scale: 1}}className="weatherBlock">
          <h2><WeatherInfo1 {...mainTemp} /></h2>
          <h2><WeatherInfo3 {...chosenWeather} /></h2>
          <h2><WeatherInfo4 {...chosenWind} /></h2>          
          <h2><WeatherInfo2 {...chosenLocation}{...isLoading} /></h2>
          
          
          </motion.div>
        <motion.div initial={{scale: 0}} animate={{scale: 1}}>
        <h2><WeatherForcast chosenForecast={chosenForecast} /></h2>
        </motion.div>

        </>  
        : <motion.h2 initial={{opacity:0}} animate={{opacity:1 }} transition={{ease: "linear", duration: .5, repeat: Infinity , repeatType: "reverse"}} h2>Awaiting Input</motion.h2>}

    </div>
  )
}

export default App

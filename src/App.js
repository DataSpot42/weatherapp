import { React, useState, useEffect, useContext, useRef } from "react"

import { WeatherInfo1, WeatherInfo2, WeatherInfo3, WeatherInfo4 } from "./componants/weatherText"
import PlaceComponent from "./componants/locationsearch";
import { fadeIn } from "react-animations";
import { StyleSheet, css } from 'aphrodite';
import './App.css'
let isLoading=false  
const App = () => {
  
  
  
  let [geo, setGeo] = useState("0");
  const childToParent =(childData) => {
  
    setGeo(childData);
    console.log(geo);
    
    
 } 



  
  
  const defaulttown = 'London'
  
  const [location,setLocation] = useState([])
  const [town,setTown] = useState('London')
  const [weather,setWeather] = useState([{"name" : "."}])
  const [mainTemp,SetMainTemp] = useState([{"temp" : "Awaiting Input"}])
  const [chosenWeather,setChosenWeather] = useState('')
  const [chosenWind,setChosenWind] = useState('')
  const [chosenLocation,setChosenLocation] = useState('')
 
  
  
  
/* const handlerLocationFind = async() => {


  console.log(town) 
  
  const API_KEY = process.env.REACT_APP_API_KEY 
  
  let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${API_KEY}`)
 
  let data = await response.json()
  console.log(data)
  setLocation(data)
  setTimeout(console.log(location),1000)
  if (data.length == 0) {SetErrorCap(true); console.log('damn again'); setTown('London'); handleError()} else {errorthing=true}
  setLocation(data)
}  */
  
  const handlerFindWeather = async(geo) => {
  console.log(geo)
  const API_KEY = process.env.REACT_APP_API_KEY 
  let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&units=metric&appid=${API_KEY}`)
  let data2 = await response2.json()
  setWeather(data2.weather)
  SetMainTemp(data2.main)
  setChosenLocation(data2)
  setChosenWeather(data2.weather[0])
  setChosenWind(data2.wind)
  console.log(data2.main)
  console.log(data2)
  console.log(mainTemp)
  isLoading=true
  /* handlerFindWeather(geo) */
  }  
 

/* const handleSubmit = (event) => {
    event.preventDefault();    
    console.log(town)    
    handlerLocationFind()   
    
  }; */
  const handleSelectedlocation = (geo,e) => {
    e.preventDefault();
    
    console.log(geo)
   
    
    handlerFindWeather(geo)    
  };  

   /* useEffect(() => {
    handlerFindWeather(geo)
  }, [])
   */
  console.log(geo)
  /* if (geo.length > 0) {console.log(`why??`); (e)=>handleSelectedlocation(geo,e.target.value)} */


  return (
    <div class = "whole">
      
      <h1>Steve's Weather App</h1>
      
        
         <PlaceComponent childToParent={childToParent} />
         <button class="getButton" onClick = {(e) => handlerFindWeather(geo,e.target.value)}>Get Weather</button>
       {isLoading ?  
       <div className="weatherBlock"> 
       <h2><WeatherInfo1 {...mainTemp}/></h2>        
      <h2><WeatherInfo3 {...chosenWeather}/></h2>      
      <h2><WeatherInfo4 {...chosenWind}/></h2>  
      <h2></h2>
      <h2><WeatherInfo2 {...chosenLocation}{...isLoading}/></h2></div>
      :<h2>Awaiting Input</h2>}
      
    </div>    
  )
}

export default App

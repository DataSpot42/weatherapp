import { React, useState} from "react"
import { motion } from "framer-motion";   // animation module
import { WindCalc } from "./windCalc";
import '../App.css'

import { Weather5day } from "./fiveDay";



export function WeatherTemps(props) {
    console.log(props)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} >
            <div>
                <h2>Weather Now</h2>
                <h3 >Max Temp: {Math.round(props.temp_max)} °C</h3>
                <h3>Min Temp: {Math.round(props.temp_min)} °C</h3>
                <h3>Feels Like: {Math.round(props.feels_like)} °C</h3>
                <h3>Average Temp: {Math.round(props.temp)} °C</h3>
            </div>
        </motion.div>
    )
}
export function WeatherLocation(props) {
    
    const dateDate = new Date()
    console.log(props)
    let offset = (props.dt+props.timezone)*1000
    console.log(offset)
    let curUTC= dateDate.toUTCString()
    console.log(curUTC)
    const local = new Date(offset)
    let localUTC= local.toUTCString()
    let localUTCtoArray =  localUTC.split(" ")
    localUTCtoArray.pop()
    localUTCtoArray.push("Local")
    let localText = localUTCtoArray.join(" ") 

    console.log(localText) 

    return (
        <div>
            <div>
                <h3>{(props.name)}</h3>
                
                <h3>{(localText)}</h3>
            </div>
        </div>
    )
}
export function WeatherDetail(props) {
    console.log(props)
    let icon = `http://openweathermap.org/img/w/${props.icon}.png`
    console.log(icon)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} >

            <div>
                <h3>Weather: {(props.main)}</h3>
                <h3>Weather Detail: {(props.description)}</h3>
                <img src={icon} alt="Weather Icon" width="100" height="100"/>

            </div>
        </motion.div>
    )
}
export function WeatherWind(props) {
    console.log(props.deg)
   
    let windData = props.deg
    let windDir = WindCalc(windData)
    console.log(windDir)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} >
            <div>
                <h3>Wind Speed: {(Math.round(props.speed*2.237))} mph</h3>
                <h3>Wind Drirection: {windDir}</h3>
            </div>
        </motion.div>
    )
}
export function WeatherForcast(props) {
    console.log(props.chosenForecast)
    let forecast = props.chosenForecast.list
    console.log(props)
    let noonCast = []
    let todayNoonCast = false
    const d = new Date()
    let nowTime = d.getTime() 
    let forcOffset = ((props.chosenForecast.city.timezone)*1000)+nowTime   //geting offset for time based on location
    let noonfind = []
    let timeZone = (props.chosenForecast.city.timezone/3600)*-1     // adjusts filer params for local timezone
    let offset = 12 + 3*Math.round(timeZone/3)
    let offsetText = offset.toString().padStart(2, "0")    // gets result into correct format to filter
    
    {for (let k=0; k<forecast.length; k++){             // filter to get noon (time at location) forecasts for next 4 or 5 days
        noonfind = forecast[k].dt_txt.split(" ")
        if (noonfind[1] == `${offsetText}:00:00`) {noonCast.push(forecast[k])}
        if (noonfind[1] == `${offsetText}:00:00` && k<5) {console.log(k); console.log(noonfind); todayNoonCast = true}      
    }}   
    console.log(noonCast)
    return (
        <div>

            <div className='forecastContainer'>                 
            {noonCast.map((noonCast,index) => {
            
            let windData = noonCast.wind.deg
            let windDir = WindCalc(windData)   // calls WindCalc componant to get wind direction
            const d = new Date(forcOffset);
            console.log(d)
            const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
            let day = d.getDay();
            console.log(noonCast)
            let today = week[day]   // converts day data into weekday text
            if (todayNoonCast==true){day--}   // if it is before noon locally then today's weather at noon will be shown
           
                return (
                   <div> 
               <><motion.button onClick={() => Weather5day(forecast, noonCast.dt)} className='weatherFSmall' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (1.3 + (index / 2)) }} key={index}>

                        <h4>{(week[day + index + 1])} at Noon</h4>
                        <h4>Avg Temp: {Math.round(noonCast.main.temp)}°C</h4>
                        <h4>Weather: {noonCast.weather[0].main}</h4>
                        <img src={`http://openweathermap.org/img/w/${noonCast.weather[0].icon}.png`} alt="Weather Icon" width="50" height="50" />
                        <h4>Wind Speed: {Math.round(noonCast.wind.speed * 2.37)} mph</h4>
                        <h4>Wind Direction {windDir}</h4>

                    </motion.button></>  
                    
                    
                    </div>

            )})}
            </div>
            <Weather5day />
            </div>
        )
}
                
           
            
            
     
   



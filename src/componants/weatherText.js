import { React, useState} from "react"
import { motion } from "framer-motion";   // animation module
import { WindCalc } from "./windCalc";
import '../App.css'

import { WeatherDayCastData } from "./dayCast";
import { WeatherTodayCastData } from "./todayCast";



export function WeatherTemps(props) {
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} >
            <div> 
                <h4>Weather Now:</h4>
                {/* eslint-disable-next-line react/prop-types */}
                <div >Max Temp: {Math.round(props.temp_max)} °C</div>
                {/* eslint-disable-next-line react/prop-types */}
                <div>Min Temp: {Math.round(props.temp_min)} °C</div>
                {/* eslint-disable-next-line react/prop-types */}
                <div>Feels Like: {Math.round(props.feels_like)} °C</div>
                {/* eslint-disable-next-line react/prop-types */}
                <div>Avg Temp: {Math.round(props.temp)} °C</div>
            </div>
        </motion.div>
    )
}

// eslint-disable-next-line react/prop-types
export function WeatherLocation(props) {
   
// eslint-disable-next-line react/prop-types
    let offset = (props.dt + props.timezone) * 1000   
    
    
    const local = new Date(offset)
    let localUTC = local.toUTCString()
    let localUTCtoArray = localUTC.split(" ")
    localUTCtoArray.pop()
    localUTCtoArray.push("Local")
    let localText = localUTCtoArray.join(" ")

    

    return (
        <div>
            <div>
                
{/* eslint-disable-next-line react/prop-types */}
                <p>{(props.name)}</p>

                <p className="smallText">{(localText)}</p>
            </div>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export function WeatherDetail(props) {
    

// eslint-disable-next-line react/prop-types
    let icon = `https://openweathermap.org/img/w/${props.icon}.png`   //weather icon for forecast
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} >

            <div>

{/* eslint-disable-next-line react/prop-types */}
                <div>Weather: {(props.main)}</div>
                {/* eslint-disable-next-line react/prop-types */}
                <div>{(props.description)}</div>
                <img src={icon} alt="Weather Icon" width="100" height="100" />

            </div>
        </motion.div>
    )
}
// eslint-disable-next-line react/prop-types
export function WeatherWind(props) {
    
{/* eslint-disable-next-line react/prop-types */}
    let windData = props.deg
    let windDir = WindCalc(windData)  //converts degrees into direction

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} >
            <div>
                {/* eslint-disable-next-line react/prop-types */}
                <div className="weatherNowWind">Wind Speed: {(Math.round(props.speed * 2.237))}mph</div>
                <div className="weatherNowWind">Wind Direction: {windDir}</div>
            </div>
        </motion.div>
    )
}
export function WeatherForcast(props) {
    const [showDayCast, setShowDayCast] = useState(false)
    const [timeFlag, setTimeFlag] = useState(0)
    const [chosenDay, setChosenDay] = useState(0)
    

    const handlerWeatherDayCast = (timeStamp, dayStamp) => {

        setShowDayCast(false)
        setChosenDay(dayStamp)
        setTimeFlag(timeStamp)
       
        setShowDayCast(true)
        
        
    }
    //eslint-disable-next-line
    const handlerNext12Cast = (forecast, timeZone) => {
        let next12 =[]
        for (let k=0; k<4; k++) {
            next12.push(forecast[k])
        }
        
        setShowDayCast(false)
        setChosenDay(99)
        
        setShowDayCast(true)
        
        
    }
    //eslint-disable-next-line react/prop-types
    let forecast = props.chosenForecast.list
    
    let noonCast = []
    let midnightCast = []
    let todayNoonCast = false
    const d = new Date()
    let nowTime = d.getTime()
    // eslint-disable-next-line react/prop-types
    let forcOffset = ((props.chosenForecast.city.timezone) * 1000) + nowTime   //geting offset for time based on location
    // eslint-disable-next-line react/prop-types
    let timeZoneOffset = (props.chosenForecast.city.timezone / 3600)
    let noonfind = []
    let midnightFind =[]
    // eslint-disable-next-line react/prop-types
    let timeZone = (props.chosenForecast.city.timezone / 3600) * -1     // adjusts filer params for local timezone
    let offsetNoon = 12 + 3 * Math.round(timeZone / 3)
    let offsetMidnight = 3 * Math.round(timeZone / 3)
    let offsetTextNoon = offsetNoon.toString().padStart(2, "0")    // gets result into correct format to filter
    let offsetTextMidnight = offsetMidnight.toString().padStart(2, "0")    // gets result into correct format to filter
    {
        // eslint-disable-next-line react/prop-types
        for (let k = 0; k < forecast.length; k++) {             // filter to get noon (time at location) forecasts for next 4 or 5 days
            // eslint-disable-next-line react/prop-types
            noonfind = forecast[k].dt_txt.split(" ")
            // eslint-disable-next-line react/prop-types
            if (noonfind[1] == `${offsetTextNoon}:00:00`) { noonCast.push(forecast[k]) }
            // eslint-disable-next-line react/prop-types
            if (noonfind[1] == `${offsetTextNoon}:00:00` && k < 5) { todayNoonCast = true }
        }
        
        for (let m = 0; m <8; m++) {
            // eslint-disable-next-line react/prop-types
            midnightFind = forecast[m].dt_txt.split(" ")
            if (midnightFind[1] != `${offsetTextMidnight}:00:00`) { midnightCast.push(forecast[m]) }
        }
        
    }


    return (
        <>
            <div className="centerButton">
            
                    <WeatherTodayCastData dayCastData={forecast} forecastStamp={timeFlag} dayChosen={99} timeZoneData={timeZoneOffset}  />
            </div>
            <div className='forecastContainer'>

                {noonCast.map((noonCast, index) => {

                    let windData = noonCast.wind.deg
                    let windDir = WindCalc(windData)   // calls WindCalc componant to get wind direction
                    const d = new Date(forcOffset);
                    
                    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
                    let day = d.getDay();
                    
                    /* let today = week[day]  */  // converts day data into weekday text
                    if (todayNoonCast === true) { day-- }   // if it is before noon locally then today's weather at noon will be shown

                    return (
                        <div key={index}>
                            <><motion.button onClick={(e) => handlerWeatherDayCast(noonCast.dt,(day + index + 1), e.target.value)} 
                            className='weatherButtons' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (1.3 + (index / 2)) }} key={index}>

                                <div>{(week[day + index+1])}</div>
                                <div>Avg Temp: {Math.round(noonCast.main.temp)}°C</div>
                                <div>Weather: {noonCast.weather[0].main}</div>
                                <img src={`https://openweathermap.org/img/w/${noonCast.weather[0].icon}.png`} alt="Weather Icon" width="50" height="50" />
                                <div>Wind Speed: {Math.round(noonCast.wind.speed * 2.37)} mph</div>   {/* converts m/s to mph */}
                                <div>Wind Direction {windDir}</div>
                                
                                <smaller>Press for day forecast</smaller>

                            </motion.button></>

                        </div>
                    )
                })}
             </div> 
             <div>  
                <h3></h3>
                {showDayCast && <WeatherDayCastData dayCastData={forecast} forecastStamp={timeFlag} dayChosen={chosenDay} timeZoneData={timeZoneOffset}  />}
               
               </div>              {/* up to 8 forecasts for the day selected */}
   
                </>
    )
}









import { React, useState} from "react"
import { motion } from "framer-motion";   // animation module
import { WindCalc } from "./windCalc";
import '../App.css'

import { WeatherDayCastData } from "./dayCast";



export function WeatherTemps(props) {
    console.log(props)
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} >
            <div>
                <h2>Weather Now</h2>
                {/* eslint-disable-next-line react/prop-types */}
                <h3 >Max Temp: {Math.round(props.temp_max)} °C</h3>
                {/* eslint-disable-next-line react/prop-types */}
                <h3>Min Temp: {Math.round(props.temp_min)} °C</h3>
                {/* eslint-disable-next-line react/prop-types */}
                <h3>Feels Like: {Math.round(props.feels_like)} °C</h3>
                {/* eslint-disable-next-line react/prop-types */}
                <h3>Average Temp: {Math.round(props.temp)} °C</h3>
            </div>
        </motion.div>
    )
}

// eslint-disable-next-line react/prop-types
export function WeatherLocation(props) {

    const dateDate = new Date()
    console.log(props)

// eslint-disable-next-line react/prop-types
    let offset = (props.dt + props.timezone) * 1000
    console.log(offset)
    let curUTC = dateDate.toUTCString()
    console.log(curUTC)
    const local = new Date(offset)
    let localUTC = local.toUTCString()
    let localUTCtoArray = localUTC.split(" ")
    localUTCtoArray.pop()
    localUTCtoArray.push("Local")
    let localText = localUTCtoArray.join(" ")

    console.log(localText)

    return (
        <div>
            <div>
                
{/* eslint-disable-next-line react/prop-types */}
                <h3>{(props.name)}</h3>

                <h3>{(localText)}</h3>
            </div>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export function WeatherDetail(props) {
    console.log(props)

// eslint-disable-next-line react/prop-types
    let icon = `http://openweathermap.org/img/w/${props.icon}.png`   //weather icon for forecast
    console.log(icon)
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} >

            <div>

{/* eslint-disable-next-line react/prop-types */}
                <h3>Weather: {(props.main)}</h3>
                {/* eslint-disable-next-line react/prop-types */}
                <h3>Weather Detail: {(props.description)}</h3>
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
                <h3>Wind Speed: {(Math.round(props.speed * 2.237))} mph</h3>
                <h3>Wind Drirection: {windDir}</h3>
            </div>
        </motion.div>
    )
}
export function WeatherForcast(props) {
    const [showDayCast, setShowDayCast] = useState(false)
    const [timeFlag, setTimeFlag] = useState(0)
    const [chosenDay, setChosenDay] = useState(0)
    /* const [dayCast, setDayCast] = useState("") */

    const handlerWeatherDayCast = (timeStamp, dayStamp) => {

        setShowDayCast(false)
        setChosenDay(dayStamp)
        setTimeFlag(timeStamp)
        /* setDayCast(dayStamp) */
        /* setShowFiveDay(false) */
        setShowDayCast(true)
        /* Weather5day(forecast, forecastStamp) */
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
            if (noonfind[1] == `${offsetTextNoon}:00:00` && k < 5) { console.log(k); console.log(noonfind); todayNoonCast = true }
        }
        console.log(noonCast)
        for (let m = 0; m <8; m++) {
            // eslint-disable-next-line react/prop-types
            midnightFind = forecast[m].dt_txt.split(" ")
            if (midnightFind[1] != `${offsetTextMidnight}:00:00`) { midnightCast.push(forecast[m]) }
        }
        console.log(midnightCast)
    }


    return (
        <div>

            <div className='forecastContainer'>

                {noonCast.map((noonCast, index) => {

                    let windData = noonCast.wind.deg
                    let windDir = WindCalc(windData)   // calls WindCalc componant to get wind direction
                    const d = new Date(forcOffset);
                    console.log(d)
                    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
                    let day = d.getDay();
                    console.log(noonCast)
                    /* let today = week[day]  */  // converts day data into weekday text
                    if (todayNoonCast === true) { day-- }   // if it is before noon locally then today's weather at noon will be shown

                    return (
                        <div key={index}>
                            <><motion.button onClick={(e) => handlerWeatherDayCast(noonCast.dt,(day + index + 1), e.target.value)} className='weatherFSmall' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (1.3 + (index / 2)) }} key={index}>

                                <h4>{(week[day + index+1])}</h4>
                                <h5>Avg Temp: {Math.round(noonCast.main.temp)}°C</h5>
                                <h5>Weather: {noonCast.weather[0].main}</h5>
                                <img src={`http://openweathermap.org/img/w/${noonCast.weather[0].icon}.png`} alt="Weather Icon" width="50" height="50" />
                                <h5>Wind Speed: {Math.round(noonCast.wind.speed * 2.37)} mph</h5>   {/* converts m/s to mph */}
                                <h5>Wind Direction {windDir}</h5>
                                <h6>Click here to get day forecast</h6>

                            </motion.button></>

                        </div>
                    )
                })}
                <h3></h3>
                {showDayCast && <WeatherDayCastData dayCastData={forecast} forecastStamp={timeFlag} dayChosen={chosenDay} timeZoneData={timeZoneOffset}  />}
            </div>              {/* up to 8 forecasts for the day selected */}


        </div>
    )
}









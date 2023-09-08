import { useState, useEffect } from 'react'
import { motion } from "framer-motion";

import '../App.css'



export function WeatherInfo1(props) {
    console.log(props)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} >

            <div>


                <h3 >Max Temp: {Math.round(props.temp_max)} °C</h3>
                <h3>Min Temp: {Math.round(props.temp_min)} °C</h3>
                <h3>Feels Like: {Math.round(props.feels_like)} °C</h3>
                <h3>Average Temp: {Math.round(props.temp)} °C</h3>
            </div>
        </motion.div>
    )

}
export function WeatherInfo2(props) {
    console.log(props)
    let curTime = props.dt
    
    console.log(curTime)
    return (
        <div>

            <div>

                <h3>{(props.name)}</h3>



            </div>
        </div>
    )

}
export function WeatherInfo3(props) {
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

export function WeatherInfo4(props) {
    console.log(props)
    let directions = ["N","NNE","NE","ENE","E",
		"ESE", "SE", "SSE","S",
		"SSW","SW","WSW","W",
		"WNW","NW","NNW" ];
    let section = parseInt( props.deg/22.5 + 0.5 );
    section = section % 16;
    
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} >

            <div>

                <h3>Wind Speed: {(props.speed)}m/s</h3>
                <h3>Wind Drirection: {(directions[section])}</h3>

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
    let directionsCast = 0
    let noonfind = []
    let timeZone = (props.chosenForecast.city.timezone/3600)*-1
    console.log(timeZone)
    
    let offset = 12 + 3*Math.round(timeZone/3)
    let offsetText = offset.toString().padStart(2, "0")
    console.log(offsetText)
    {for (let k=0; k<forecast.length; k++){
        /* noonfind = forecast.clouds.dt_txt */
        noonfind = forecast[k].dt_txt.split(" ")
        if (noonfind[1] == `${offsetText}:00:00`) {noonCast.push(forecast[k])}
        if (noonfind[1] == `${offsetText}:00:00` && k<5) {console.log(k); console.log(noonfind); todayNoonCast = true}
      
    }} 
    console.log(noonCast)
    
    return (
        <div>

            <div className='forecastContainer'> 
                
            {noonCast.map((noonCast,index) => {
                directionsCast = ["N","NNE","NE","ENE","E",
                "ESE", "SE", "SSE","S",
                "SSW","SW","WSW","W",
                "WNW","NW","NNW" ];
            let section = parseInt( noonCast.wind.deg/22.5 + 0.5 );
            section = section % 16;
            const d = new Date();
            const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
            let day = d.getDay();
            let today = week[day]
            if (todayNoonCast==true){day--}
            console.log(today)
            

            
                return (
               <motion.div className='weatherFSmall' initial={{scale:0}} animate={{scale:1}} transition={{delay:(1.3+(index/2))}} key={index}>
                
                <h4>{(week[day+index+1])}</h4>
                <h4>Avg Temp: {Math.round(noonCast.main.temp)}°C</h4>
                <h4>Weather: {noonCast.weather[0].main}</h4>
                <img src={`http://openweathermap.org/img/w/${noonCast.weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                <h4>Wind Speed: {noonCast.wind.speed} m/s</h4>
                <h4>Wind Direction {(directionsCast[section])}</h4>              
                
                </motion.div>
            )})}
            </div>
            </div>
        )
}
                
           
            
            
     
   



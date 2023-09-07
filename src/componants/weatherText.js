import { useState, useEffect } from 'react'
import { motion } from "framer-motion";

import '../App.css'


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
    let forecast = props.chosenForecast
/*     let forecastFiltered = [""]
    let forecastFiltered2 = []
    for (let j=0; j<forecast.length; j++) {
        forecastFiltered.push(forecast[j].main)
        forecastFiltered.push(forecast[j].dt_txt)
        forecastFiltered.push(forecast[j].weather)
        forecastFiltered.push(forecast[j].wind)
        forecastFiltered[j] = [forecast[j].main, forecast[j].dt_txt, forecast[j].weather, forecast.wind[j]]
    }
    console.log(forecastFiltered)
    console.log (forecast.length) */
    let nooncast = []
    let directionsCast = 0
    for (let i=4; i<forecast.length; i++) {        
        nooncast.push(forecast[i])
        i = i+7    }
    console.log(nooncast)
    
    return (
        <div>

            <div className='forecastContainer'> 
               {/*  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}>
                <p>Date: {(forecast[4].dt_txt)}</p>
                <p>Temp: {Math.round(forecast[4].main.temp)}°C</p>
                <p>Weather Detail: {(forecast[4].weather[0].main)}</p>
                <img src={`http://openweathermap.org/img/w/${forecast[4].weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                </motion.d iv>
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}>
                <p>Date: {(props[12].dt_txt)}</p>
                <p>Temp: {Math.round(props[12].main.temp)}°C</p>
                <p>Weather Detail: {(props[12].weather[0].main)}</p>
                <img src={`http://openweathermap.org/img/w/${props[12].weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                </motion.div>
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.4}}>
                <p>Data: {(props[20].dt_txt)}</p>
                <p>Temp: {Math.round(props[20].main.temp)}°C</p>
                <p>Weather Detail: {(props[20].weather[0].main)}</p>
                <img src={`http://openweathermap.org/img/w/${props[20].weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                </motion.div>
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.6}}>
                <p>Date: {(props[28].dt_txt)}</p>
                <p>Temp: {Math.round(props[28].main.temp)}°C</p>
                <p>Weather Detail: {(props[28].weather[0].main)}</p>
                <img src={`http://openweathermap.org/img/w/${props[28].weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                </motion.div>
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.8}}>
                <p>Date: {(props[36].dt_txt)}</p>
                <p>Temp: {Math.round(props[36].main.temp)}°C</p>
                <p>Weather Detail: {(props[36].weather[0].main)}</p>
                <img src={`http://openweathermap.org/img/w/${props[36].weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                </motion.div>
 */}
            {nooncast.map((nooncast,index) => {
                directionsCast = ["N","NNE","NE","ENE","E",
                "ESE", "SE", "SSE","S",
                "SSW","SW","WSW","W",
                "WNW","NW","NNW" ];
            let section = parseInt( nooncast.wind.deg/22.5 + 0.5 );
            
            const d = new Date();
            const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
            let day = d.getDay();
            let today = week[day]
            console.log(today)

            section = section % 16;
                return (
               <motion.div className='weatherFSmall' initial={{scale:0}} animate={{scale:1}} transition={{delay:(1.3+(index/2))}} key={index}>
               <h4>{(week[day+index+1])}</h4>
                <h4>Avg Temp: {Math.round(nooncast.main.temp)}°C</h4>
                <h4>Weather: {nooncast.weather[0].main}</h4>
                <img src={`http://openweathermap.org/img/w/${nooncast.weather[0].icon}.png`} alt="Weather Icon" width="50" height="50"/>
                <h4>Wind Speed: {nooncast.wind.speed} m/s</h4>
                <h4>Wind Direction {(directionsCast[section])}</h4>              
                
                </motion.div>
            )})}
            </div>
            </div>
        )
}
                {/* <img src={`http://openweathermap.org/img/w/${forecast[0].icon}.png`} alt="Weather Icon" width="50" height="50"/> */}
               
           
            
            
       /*   */
   



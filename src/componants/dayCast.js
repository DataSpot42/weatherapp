import { React,useState, useEffect, useRef } from "react"
import { motion } from "framer-motion";   // animation module
import { WindCalc } from "./windCalc";

export function WeatherDayCastData({dayCastData, forecastStamp, dayChosen}) {
    const [dayCast, setDayCast] = useState([])
    const count = useRef(0);

    
    let dayCastArry = []
    let start = 0
    let noon = 0
    let middayCalc = 0
    
    for (let i = 0; i < dayCastData.length; i++) {
        if (dayCastData[i].dt === forecastStamp) {  //filtering array to get that day's range of forecasts (up to 8)      
            
            if (i - 3 < 0) { start = 0 } else { start = i - 3 }      //stops returning a negative array element which will pick from end
            dayCastArry = dayCastData.slice(start, i + 5)          // creates new array for chosen day's forecast
            
        }
    }
    for (let j = 0; j<dayCastArry.length; j++) {
        
        if (dayCastArry[j].dt === forecastStamp) {noon = j}  //finding the forecast for noon on today 
    }
    
    
    useEffect(() => {
        setDayCast(dayCastArry)  //stops compnent looping around setState
      },[forecastStamp]);
    
    return (
        <div className='forecastContainer'>
            {console.log(dayCast)}
            
            {dayCast.map((dayCast,index) => {
                let windData = dayCast.wind.deg
                let windDir = WindCalc(windData)   // convert degrees to direction
                middayCalc=(index*3+((noon-2)*3))  // setting time of forcast to display
                
                return (
                    <div>
                         <p></p>
                
                    <motion.div className='weatherFSmall' key ={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (0.4+index/2) }} >
                      
                      
                        <h4>{dayChosen} {middayCalc.toString().padStart(2,'0')}:00</h4> 
                        <h4>Avg Temp: {Math.round(dayCast.main.temp)}°C</h4>
                        <h4>Weather: {dayCast.weather[0].main}</h4>
                        <img src={`http://openweathermap.org/img/w/${dayCast.weather[0].icon}.png`}
                            alt="Weather Icon" width="50" height="50" />
                        <h4>Wind Speed: {Math.round(dayCast.wind.speed * 2.37)} mph</h4>   {/* converts m/s to mph */}
                        <h4>Wind Direction {windDir}</h4>
                    </motion.div>

                </div>
           ) })}


        </div>
    )

}
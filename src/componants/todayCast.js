import { React, useState, useEffect, useRef } from "react"
import { WindCalc } from "./windCalc";
import Popup from "reactjs-popup"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import '../App.css'

// eslint-disable-next-line react/prop-types
export function WeatherTodayCastData({ dayCastData, forecastStamp, dayChosen, timeZoneData }) {
    console.log(dayCastData, forecastStamp,dayChosen,timeZoneData)
    const [dayCast, setDayCast] = useState([])
    const ref = useRef();
     // eslint-disable-next-line
    const toggleTooltip = () => ref.current.toggle();
    const isPresent = useIsPresent


    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let today = week[dayChosen]
    let thisdaytoday = week[dayChosen]
    let tomorrow = week[dayChosen + 1]
    let yesterday = week[dayChosen - 1]
    
    let dayCastArry = []
    let start = 0
    let noon = 0
    let startTime = 0
    if (dayChosen === 99) {
        
        // eslint-disable-next-line react/prop-types
        dayCastArry = dayCastData.slice(0, 4)
        
        useEffect(() => {
            setDayCast(dayCastArry)  //stops component looping around setState
        }, [100]);
    }
    else {
        // eslint-disable-next-line react/prop-types
        for (let i = 0; i < dayCastData.length; i++) {
            // eslint-disable-next-line react/prop-types
            if (dayCastData[i].dt === forecastStamp) {  //filtering array to get that day's range of forecasts (up to 8)      
                // eslint-disable-next-line react/prop-types      
                if (i - 3 < 0) { start = 0 } else { start = i - 3 }      //stops returning a negative array element which will pick from end
                // eslint-disable-next-line react/prop-types
                dayCastArry = dayCastData.slice(start, i + 5)        // creates new array for chosen day's forecast
            }
        }
        for (let j = 0; j < dayCastArry.length; j++) {
            if (dayCastArry[j].dt === forecastStamp) { noon = j }  //finding the forecast for noon on today 
        }
        for (let h = 3; h > noon; h--) {
            
            startTime = startTime + 3
        }

        console.log(`starttime is: ${startTime} noon is ${noon}`)

        
        useEffect(() => {
            setDayCast(dayCastArry)  //stops component looping around setState
        }, [forecastStamp]);
    }
    return (
        <Popup
        ref={ref}
        position="below" closeOnDocumentClick
        trigger={          
            <button type="button" className="button2">Show Next 12 Hours</button>}>
        <div className="WeatherDetailedContainer">
        <AnimatePresence> 
        <motion.div layout
                    variants={{
                        hidden: () => ({
                            scale: 0,
                            y:100,
                            x: -1000
                        }),
                        visable: () => ({
                            scale: 1,
                            x: 0,
                            y: 0,
                            transition: {
                                delay: 0.025,
                            },
                        }),
                        removed: {
                            scale: 0
                        },
                    }}
                    
                    initial="hidden"
                    animate="visable"
                    exit="removed"  
                    style={{
                        position: isPresent ? 'hidden' : 'visable '
                    }} 
                    className="popupClass" >
                    
                  
            {dayCast.map((dayCast, index) => {
                let windData = dayCast.wind.deg
                let windDir = WindCalc(windData)   // convert degrees to direction
                let timeFind = dayCast.dt_txt.split(" ")
                let timeNum = parseInt(timeFind[1])
                let timeOffset = timeNum + (timeZoneData)    //take into account the location timezone            
                {
                    if (timeOffset >= 24) {
                        timeOffset = timeOffset - 24;
                        if (index < 5) {
                            today = yesterday
                        }
                        else { today = tomorrow }
                    } else { today = thisdaytoday }
                }    // get correct day displayed

                

                return (
                    <div key={index}>
                        <motion.div className='weatherFSmall' key={index} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (0 + index / 2) }} >


                            <p>{today} {timeOffset.toString().padStart(2, '0')}:00</p>
                            <div className="weatherDayGrid">
                            <div>
                            <p>Avg Temp: {Math.round(dayCast.main.temp)}°C</p>
                            <p>Weather: {dayCast.weather[0].main}</p></div>
                            <p>Wind Speed: {Math.round(dayCast.wind.speed * 2.37)} mph</p>   {/* converts m/s to mph */}
                            <p>Wind Direction {windDir}</p>
                            <div>
                            <img src={`https://openweathermap.org/img/w/${dayCast.weather[0].icon}.png`}
                                alt="Weather Icon" width="50" height="50" />
                            
                            </div>
                            </div>
                        </motion.div>

                    </div>
                )
            })}
  </motion.div>
 </AnimatePresence> 
 </div>
 </Popup>

        
    )

}
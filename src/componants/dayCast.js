import { React,useState, useEffect} from "react"
import { motion } from "framer-motion";   // animation module
import { WindCalc } from "./windCalc";

// eslint-disable-next-line react/prop-types
export function WeatherDayCastData({dayCastData, forecastStamp, dayChosen, timeZoneData}) {
    const [dayCast, setDayCast] = useState([])
    /* const count = useRef(0); */
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']
    let today = week[dayChosen]
    let thisdaytoday = week[dayChosen]
    let tomorrow = week[dayChosen+1]
    let yesterday = week[dayChosen-1]
    console.log(yesterday,today,tomorrow,dayChosen)
    let dayCastArry = []
    let start = 0
    let noon = 0
    let startTime = 0
    /* let middayCalc = 0 */
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
    for (let j = 0; j<dayCastArry.length; j++) {        
        if (dayCastArry[j].dt === forecastStamp) {noon = j}  //finding the forecast for noon on today 
    }
    for (let h =  3; h>noon; h--){
        console.log(h)
        startTime=startTime+3
    }
    console.log(`starttime is: ${startTime} noon is ${noon}`)
    
    useEffect(() => {
        setDayCast(dayCastArry)  //stops component looping around setState
      },[forecastStamp]);
    
    return (
        <div className="WeatherDetailedContainer">
            {console.log(dayCast)}
            
            {dayCast.map((dayCast,index) => {
                let windData = dayCast.wind.deg
                let windDir = WindCalc(windData)   // convert degrees to direction
                let timeFind=dayCast.dt_txt.split(" ") 
                let timeNum=parseInt(timeFind[1])
                let timeOffset = timeNum+(timeZoneData)                
                {if (timeOffset>=24) {
                    timeOffset=timeOffset-24; 
                        if (index<5) {
                            today=yesterday}
                                else {today=tomorrow} 
                    } else {today=thisdaytoday} }
                              
                console.log (timeFind, timeNum, timeOffset, timeZoneData)
                /* middayCalc=(middayCalc+startTime+3)  // setting time of forcast to display */                
                return (
                    <div key={index}>                      
                    <motion.div className='weatherFSmall' key ={index} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (0+index/2) }} >
                      
                      
                        <h4>{today} {timeOffset.toString().padStart(2,'0')}:00</h4> 
                        <h5>Avg Temp: {Math.round(dayCast.main.temp)}°C</h5>
                        <h5>Weather: {dayCast.weather[0].main}</h5>
                        <img src={`http://openweathermap.org/img/w/${dayCast.weather[0].icon}.png`}
                            alt="Weather Icon" width="50" height="50" />
                        <h5>Wind Speed: {Math.round(dayCast.wind.speed * 2.37)} mph</h5>   {/* converts m/s to mph */}
                        <h5>Wind Direction {windDir}</h5>
                    </motion.div>

                </div>
           ) })}


        </div>
    )

}
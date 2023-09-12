import { React,useState } from "react"

export function WeatherDayCastData({dayCastData, forecastStamp}) {
    const [dayCast, setDayCast] = useState([])
    console.log(dayCastData);
    let dayCastArry = []
    let k = 0
    console.log(forecastStamp)
    for (let i = 0; i < dayCastData.length; i++) {
        if (dayCastData[i].dt === forecastStamp) {  //filtering array to get that day's range of forecasts        
            if (i - 3 < 0) { k = 0 } else { k = i - 3 }      //stops returning a negative array element which will pick from end
            dayCastArry = dayCastData.slice(k, i + 5)
            
            
        }
    }
    console.log(dayCastArry)
    setDayCast(dayCastArry)
    
    return (
        <div className='forecastContainer'>
            {console.log(dayCast)}
            {/* <h3>Testing withinin {dayCast[0]}</h3> */}
            {dayCast.map((dayCast,index) => {
               
                /* let windData = dayCast.wind.deg */
                
                /* let windDir = WindCalc(windData) */
               
                    <div className='weatherFSmall' key={index}>
                         {/* {console.log(`this is ${dayCast.main.temp}`)} */}
                        <h4>Avg Temp: {Math.round(dayCast.main.temp)}°C</h4>
                        <h4>Weather: {dayCast.weather[0].main}</h4>
                        <img src={`http://openweathermap.org/img/w/${dayCast.weather[0].icon}.png`}
                            alt="Weather Icon" width="50" height="50" />
                        <h4>Wind Speed: {Math.round(dayCast.wind.speed * 2.37)} mph</h4>   {/* converts m/s to mph */}
                        {/* <h4>Wind Direction {windData}</h4> */}
                    </div>
                
            })}


        </div>
    )

}
export function Weather5day (fiveDayData,forecastArray) {
console.log(fiveDayData);
let fiveDayArry=[]
let k=0
console.log(forecastArray)
for (let i=0; i<fiveDayData.length;i++) {
    if (fiveDayData[i].dt == forecastArray) {
        if (i-3<0){k = 0}else {k=i-3}
        fiveDayArry = fiveDayData.slice(k,i+5)
       /* console.log(fiveDayD)  */
    }
    
}
console.log(fiveDayArry)

return (
    <div className='forecastContainer'>  
        {fiveDayArry.map((fiveDayArry) => {
            /* let windData = fiveDayArry.wind.deg */
            /* let windDir = WindCalc(windData) */
            
                <div className='weatherFSmall'>
                    <h4>Avg Temp: {Math.round(fiveDayArry.main.temp)}°C</h4>
                        <h4>Weather: {fiveDayArry.weather[0].main}</h4>
                        <img src={`http://openweathermap.org/img/w/${fiveDayArry.weather[0].icon}.png`} alt="Weather Icon" width="50" height="50" />
                        <h4>Wind Speed: {Math.round(fiveDayArry.wind.speed * 2.37)} mph</h4>
                        {/* <h4>Wind Direction {windData}</h4> */}
                </div>
          
        })}


    </div>
)

}
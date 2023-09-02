import { React, useState, useEffect, useContext } from "react"
import { WeatherInfo1, WeatherInfo2, WeatherInfo3, WeatherInfo4 } from "./componants/weatherText"
import PlaceComponent from "./componants/locationsearch";

const App = () => {
  
  
  
  let [geo, setGeo] = useState("0");
  const childToParent =(childData) => {
    
    setGeo(childData);
    console.log(geo);
    
    
 } 



  
  
  const defaulttown = 'London'
  
  const [location,setLocation] = useState([])
  const [town,setTown] = useState('London')
  const [weather,setWeather] = useState([{"name" : "."}])
  const [mainTemp,SetMainTemp] = useState([{"temp" : "Awaiting Input"}])
  const [chosenWeather,setChosenWeather] = useState('')
  const [chosenWind,setChosenWind] = useState('')
  const [chosenLocation,setChosenLocation] = useState('')
  const [errorThrow,setErrowThrow] = useState(null)
  console.log(location)
  
  
  
/* const handlerLocationFind = async() => {


  console.log(town) 
  
  const API_KEY = process.env.REACT_APP_API_KEY 
  
  let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${API_KEY}`)
 
  let data = await response.json()
  console.log(data)
  setLocation(data)
  setTimeout(console.log(location),1000)
  if (data.length == 0) {SetErrorCap(true); console.log('damn again'); setTown('London'); handleError()} else {errorthing=true}
  setLocation(data)
}  */
  
  const handlerFindWeather = async(geo) => {
  console.log(geo)
  const API_KEY = process.env.REACT_APP_API_KEY 
  let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&units=metric&appid=${API_KEY}`)
  let data2 = await response2.json()
  setWeather(data2.weather)
  SetMainTemp(data2.main)
  setChosenLocation(data2.name)
  setChosenWeather(data2.weather[0])
  setChosenWind(data2.wind)
  
  console.log(data2)
  console.log(mainTemp)
  /* handlerFindWeather(geo) */
  }  
 

/* const handleSubmit = (event) => {
    event.preventDefault();    
    console.log(town)    
    handlerLocationFind()   
    
  }; */
  const handleSelectedlocation = (geo,e) => {
    e.preventDefault();
    
    console.log(geo)
   
    
    handlerFindWeather(geo)    
  };  

   /* useEffect(() => {
    handlerFindWeather(geo)
  }, [])
   */
  console.log(geo)
  /* if (geo.length > 0) {console.log(`why??`); (e)=>handleSelectedlocation(geo,e.target.value)} */


  return (
    <div>
      
      <h1>my site again</h1>
      
        {geo}
         <PlaceComponent childToParent={childToParent} />
         <button onClick = {(e) => handlerFindWeather(geo,e.target.value)}>IThis works as long as other button is present</button>
         
       
      
      <h2><WeatherInfo1 {...mainTemp}/></h2>
      <h2><WeatherInfo2 {...chosenLocation}/></h2>
      <h2><WeatherInfo3 {...chosenWeather}/></h2>
      <h2><WeatherInfo4 {...chosenWind}/></h2>
      
    </div>    
  )
}

export default App

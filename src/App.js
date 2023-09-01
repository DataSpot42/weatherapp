import { useState, useEffect } from "react"
import { WeatherInfo1, WeatherInfo2, WeatherInfo3, WeatherInfo4 } from "./componants/weatherText"


const App = () => {
  let errorthing = true
  const defaulttown = 'London'
  const [errorCap,SetErrorCap] = useState(false);
  const [location,setLocation] = useState([{"name" : "", "lat" : "99", "lon" : "99"}])
  const [town,setTown] = useState('London')
  const [weather,setWeather] = useState([{"name" : "."}])
  const [mainTemp,SetMainTemp] = useState([{"temp" : "Awaiting Input"}])
  const [chosenWeather,setChosenWeather] = useState('')
  const [chosenWind,setChosenWind] = useState('')
  const [chosenLocation,setChosenLocation] = useState('')
  console.log(location)
  
const handlerLocationFind = async() => {
  /* const handleError = () => {
    console.log('here i am')
    errorthing = false
    console.log(errorthing)
    setTown(defaulttown)
    console.log(town) 
    return (town)
  } 
 */
  console.log(town) 
  
  const API_KEY = process.env.REACT_APP_API_KEY 
  
  let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${API_KEY}`)
 
  let data = await response.json()
  console.log(data)
  setLocation(data)
  setTimeout(console.log(location),1000)
  /* if (data.length == 0) {SetErrorCap(true); console.log('damn again'); setTown('London'); handleError()} else {errorthing=true}
  setLocation(data) */
} 
  
  const handlerFindWeather = async(lat,lon) => {
  const API_KEY = process.env.REACT_APP_API_KEY 
  let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  let data2 = await response2.json()
  setWeather(data2.weather)
  SetMainTemp(data2.main)
  setChosenLocation(data2.name)
  setChosenWeather(data2.weather[0])
  setChosenWind(data2.wind)
  console.log(errorthing)
  console.log(data2)
  console.log(mainTemp)
  }



  

const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(town)
    
    handlerLocationFind()
    
    
  };
  const handleSelectedlocation = (lat,lon,e) => {
    e.preventDefault();
    
    console.log(lat)
    console.log(lon)
    
    handlerFindWeather(lat,lon)
    
    
  };





  const handleInputChange = (event) => {
    const town = (event.target.value);
    console.log(town)}

  useEffect(() => {
    handlerLocationFind()
  }, [])



  
  return (
    <div>
      
      <h1>my site again</h1>
      
      <form onSubmit={handleSubmit}>
      <input            
            name="enter uk town"
            type="text"
            className="textbox"
            placeholder="Enter town here"
            
            onChange={(e) => setTown(e.target.value)}
            value={town.text}
            
            
          />
          <button class="buttons" type="submit">Submit</button>
     </form> 
   {/* <h2>The weather in {location[0].name} today will be:</h2>: <h2>invalid input</h2> */}
      
    

   {/*  {location.map((data, index) => {
       (
          <p key={`Hello ${data.name}, ${data.country}, ${data.state}`}>
              {data.name} - {data.country} - {data.state}
          </p>
      )
  })} */}

{location.map((item,index)=>
               {return (
                
                <><p>Town: {item.name}     {item.state}     {item.country} 
                </p><form onSubmit={(e) => handleSelectedlocation(item.lat,item.lon,e)}><button class="buttons" type="submit">Select</button></form></>
                                
                )})}
    
    
    
      
      
      <form>
      </form>
      
      <h2><WeatherInfo1 {...mainTemp}/></h2>
      <h2><WeatherInfo2 {...chosenLocation}/></h2>
      <h2><WeatherInfo3 {...chosenWeather}/></h2>
      <h2><WeatherInfo4 {...chosenWind}/></h2>
      
    </div>
    
  )

}

export default App

//export const wData = data2.main




/* import React from "react"

class App extends React.Component {

  state = {
    num: 0
  }

  componentDidMount () {
    console.log(`component did mount`)
    this.setState({num: this.state.num +1})
  }
  componentDidUpdate() {
    console.log(`state updated`)
  }

  render () {
    return (
      <div>
        <h1>my site</h1>
        <h2>{this.state.num}</h2>
        <button onClick={() => this.setState({num: this.state.num +1})}>+</button>
      </div>
    )
  }
}

export default App
*/
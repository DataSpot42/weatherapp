import { useState, useEffect } from "react"
import { WeatherInfo } from "./componants/weatherText"


const App = () => {
  let errorthing = true
  const defaulttown = 'London'
  const [errorCap,SetErrorCap] = useState(false);
  const [location,setLocation] = useState([{"name" : "", "lat" : "99", "lon" : "99"}])
  const [town,setTown] = useState('London')
  const [weather,setWeather] = useState([{"name" : "."}])
  const [mainTemp,SetMainTemp] = useState([{"temp" : "Awaiting Input"}])
  console.log(location)
  
const handler = async() => {
  const handleError = () => {
    console.log('here i am')
    errorthing = false
    console.log(errorthing)
    setTown(defaulttown)
    console.log(town) 
    return (town)
  } 

  console.log(town) 
  
  const API_KEY = process.env.REACT_APP_API_KEY 
  
  let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${API_KEY}`)
 
  let data = await response.json()
  console.log(data)
  if (data.length == 0) {SetErrorCap(true); console.log('damn again'); setTown('London'); handleError()} else {errorthing=true}
  setLocation(data)
  let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0].lat}&lon=${location[0].lon}&units=metric&appid=${API_KEY}`)
  let data2 = await response2.json()
  setWeather(data2.weather)
  SetMainTemp(data2.main)
  console.log(errorthing)
  
  console.log(mainTemp)
  


  
  
}
const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(town)
    
    handler()
    
    
  };


  const handleInputChange = (event) => {
    const town = (event.target.value);
    console.log(town)}

  useEffect(() => {
    handler()
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
      {errorthing ?  
      <h2>The weather in {location[0].name} today will be:</h2>: <h2>invalid input</h2>}
      
      
      
      
      </form>
      {errorthing ?
      <h2><WeatherInfo {...mainTemp}/></h2> : <h2>Invalid</h2>}
      
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
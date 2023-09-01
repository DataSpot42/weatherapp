import { useState } from 'react'

export function WeatherInfo1(props) {
    console.log(props)
    return (
        <div>
            
            <div>
                
                
                <h3>Max Temp: {Math.round(props.temp_max)} degC</h3>
                <h3>Min Temp: {Math.round(props.temp_min)} degC</h3>
                <h3>Feels Like: {Math.round(props.feels_like)} degC</h3>
                <h3>Average Temp: {Math.round(props.temp)} degC</h3>             
            </div>
        </div>
    )

}
export function WeatherInfo2(props) {
  console.log(props)
  return (
      <div>
          
          <div>
              
              <h3>Select Location: {(props.name)}</h3>
                      
          </div>
      </div>
  )

}
export function WeatherInfo3(props) {
  console.log(props)
  return (
      <div>
          
          <div>
              
              <h3>Weather: {(props.main)}</h3>
              <h3>Weather Detail: {(props.description)}</h3>
                         
          </div>
      </div>
  )

}

export function WeatherInfo4(props) {
  console.log(props)
  return (
      <div>
          
          <div>
              
              <h3>Wind Speed: {(props.speed)}</h3>
              <h3>Wind Drirection: {(props.deg)} deg</h3>
                          
          </div>
      </div>
  )

}
//{<h4>More Data: {props.data4u}</h4>}

//<ul>
  //             {this.props.data4u.map( data => `<li> ${data} </li>` )}
    //         </ul>
 //   {props.map(title => {
   //     return <div key={title}>{title}</div>;
     // })}
         
    
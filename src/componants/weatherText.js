import { useState, useEffect } from 'react'



import '../App.css'
export function WeatherInfo1(props) {
    console.log(props)
    return (
        <div>

            <div>


                <h3>Max Temp: {Math.round(props.temp_max)} °C</h3>
                <h3>Min Temp: {Math.round(props.temp_min)} °C</h3>
                <h3>Feels Like: {Math.round(props.feels_like)} °C</h3>
                <h3>Average Temp: {Math.round(props.temp)} °C</h3>
            </div>
        </div>
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
        <div>

            <div>

                <h3>Weather: {(props.main)}</h3>
                <h3>Weather Detail: {(props.description)}</h3>
                <img src={icon} alt="Weather Icon" width="100" height="100"/>

            </div>
        </div>
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
        <div>

            <div>

                <h3>Wind Speed: {(props.speed)}m/s</h3>
                <h3>Wind Drirection: {(directions[section])}</h3>

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


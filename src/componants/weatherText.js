import { useState } from 'react'

export function WeatherInfo(props) {
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
//{<h4>More Data: {props.data4u}</h4>}

//<ul>
  //             {this.props.data4u.map( data => `<li> ${data} </li>` )}
    //         </ul>
 //   {props.map(title => {
   //     return <div key={title}>{title}</div>;
     // })}
         
    
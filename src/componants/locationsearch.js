import React, { useState, useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

import '../componants/css/weather.css'

const libraries = ['places'];
export default function PlaceComponent({childToParent}) {
    const [geoState,setGeoState] = useState([])
    const inputRef = useRef();
    const geoData = geoState;                               //establishing required variables
    

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_KEY,         // API key for Google Autocompete location
        libraries
    });

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        setGeoState([place.geometry.location.lat(),place.geometry.location.lng()])
        console.log(place);                                         //getting longditure and latitude for chosen location
        };

    return (
        isLoaded
        &&
        <div className="textbox">
        <StandaloneSearchBox      //google autocomplete searchbox
            
            onLoad={ref => inputRef.current = ref}
            onPlacesChanged={handlePlaceChanged}
        >
            <input
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `5 5px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `18px`,
                    outline: `none`,
                    textOverflow: `ellipses`,   // syling to get a glass type effect to box
                  }}

                type="text"
                className="form-control"
                placeholder="Enter Location"/>
            
        </StandaloneSearchBox>
                                       {/*  passing location data back the the parent (App) componant */}
        <div>
            <h1>{childToParent(geoState)}</h1>   
         
      </div>
        </div>   
    );
}


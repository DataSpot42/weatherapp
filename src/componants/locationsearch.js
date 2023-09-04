import React, { useState, useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

import '../componants/css/weather.css'

const libraries = ['places'];
export default function PlaceComponent({childToParent}) {
    const [geoState,setGeoState] = useState([])
    const inputRef = useRef();
    const geoData = geoState;
    console.log(geoData)

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_KEY,
        libraries
    });

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        setGeoState([place.geometry.location.lat(),place.geometry.location.lng()])
        console.log(place);
        
        if (place) {
            console.log(place.formatted_address);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        }

        
    };

    return (
        isLoaded
        &&
        <div class="textbox">
        <StandaloneSearchBox
            
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
                    textOverflow: `ellipses`,
                  }}

                type="text"
                className="form-control"
                placeholder="Enter Location" E/>
            
        </StandaloneSearchBox>
        
        <div>
            <h1>{childToParent(geoState)}</h1>
         
      </div>
        </div>   
    );
}


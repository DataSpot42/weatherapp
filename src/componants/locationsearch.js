import React, { useState, useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { ThingsProvider } from './thingsContext'


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
        <div>
        <StandaloneSearchBox
            
            onLoad={ref => inputRef.current = ref}
            onPlacesChanged={handlePlaceChanged}
        >
            <input
                type="text"
                className="form-control"
                placeholder="Enter Location" />
            
        </StandaloneSearchBox>
        <h1>data {geoData} state {geoState}</h1>
        <div>
            
         <button onClick = {childToParent(geoState)}>Get Weather</button>
      </div>
        </div>   
    );
}


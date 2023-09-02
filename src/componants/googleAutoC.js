import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';



export default function Component(childToParent) {
    const [value, setValue] = useState([]);
    console.log(value)
    const geo = "This is data from Child Component to the Parent Component."
    
    geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => console.log('Successfully got latitude and longitude', { lat, lng })
        );

    return (
        <div>
        <div>
            
            <GooglePlacesAutocomplete
                selectProps={{
                    value,
                    onChange: setValue
                }} />
                
        </div>
        <button primary onClick={() => childToParent(geo)}>Click Child</button>
        </div>
    );
}



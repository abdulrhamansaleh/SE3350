import React from "react";
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPing.js'
import './Map.css'

function Map({ location, zoomLevel }){
    return(
    <div className="map">
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBULDVVn7ZVGgZfeN9GEn1Ua3_10Bb9SDU"}}
          defaultCenter={location.map}
          defaultZoom={zoomLevel}
          draggable={false}
        >
          <LocationPin
            lat={location.map.lat}
            lng={location.map.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
    )
}

  export default Map
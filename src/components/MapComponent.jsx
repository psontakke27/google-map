import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const MapComponent = ({ lat, lng }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={15}>
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;



// import React from 'react'
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// }

// function MapComponent({ coords }) {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'YOUR_GOOGLE_API_KEY',
//   })

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={{ lat: coords.lat, lng: coords.lng }}
//       zoom={12}
//     >
//       <Marker position={{ lat: coords.lat, lng: coords.lng }} />
//     </GoogleMap>
//   ) : (
//     <div>Loading map...</div>
//   )
// }

// export default React.memo(MapComponent)

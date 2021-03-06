import React, { useState } from "react"; // changed
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api"; // changed

function Map(props) {
  const [response, setResponse] = useState(null); // new

  // new
  const hasTwoAddresses =
    props.pickUpAddress !== "" && props.dropOffAddress !== "";

  // new
  const directionsCallback = response => {
    if (response !== null && response.status === "OK") {
      setResponse(response);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
        mapContainerStyle={{
          width: "100%",
          height: "300px",
          marginBottom: "10px",
        }}
        zoom={props.zoom}
      >
        {/* new */}
        {hasTwoAddresses && (
          <DirectionsService
            options={{
              origin: props.pickUpAddress,
              destination: props.dropOffAddress,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          ></DirectionsService>
        )}
        {hasTwoAddresses && response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
        {!hasTwoAddresses && (
          <Marker
            label="A"
            position={{
              lat: props.lat,
              lng: props.lng,
            }}
          ></Marker>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

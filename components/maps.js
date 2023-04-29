import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
function Mapp() {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [click, setClick] = useState()
  // Get the user's current location
  useEffect(() => {

  }, [click]);

  // Update the Google Map to show the user's location
  useEffect(() => {
    if (window.google && position.lat && position.lng && !map) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: position.lat, lng: position.lng },
        zoom: 8,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: position.lat, lng: position.lng },
        map: map,
        title: 'Your Location',
      });
      setMap(map);
    }
  }, [position, map]);


  return (
    <div>
      <Map center={position} zoom={14}>
        <Marker onClick={()=>print("nothing")} name={'Current location'} />
      </Map>
      <button onClick={() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }} >Click</button>
    </div>
  );
}

export default Mapp;

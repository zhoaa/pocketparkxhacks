import React, {useState, useEffect} from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import {useHistory} from 'react-router-dom';
import {createPark} from '../api/index';

const TORONTO = [-79.347015, 43.651070];

export const Map = () => {
    // Default user to Toronto
    const [userLocation, setUserLocation] = useState(TORONTO);
    const [parks, setParks] = useState([]);
    const [chosenPark, setChosenPark] = useState(null);
    const history = useHistory();
    // const dispatch = useDispatch();

    const ACCESS_TOKEN = 'pk.eyJ1IjoiaXZ5LXpob3UiLCJhIjoiY2tzMTQydzF3MDRmMDJucXE1OGdydXFkOSJ9.iB1G6iWkATg7hfII0nphwA'

    useEffect(() => {
      const location = userLocation;
      const geocodingService = mbxGeocoding({ accessToken: ACCESS_TOKEN });
      geocodingService
        .forwardGeocode({
          query: 'park',
          autocomplete: false,
          limit: 10,
          countries: ['ca', 'us'],
          proximity: location
        })
        .send()
        .then((response) => {
          if (!response || !response.body || !response.body.features || !response.body.features.length) {
            console.error('Invalid response:');
            console.error(response);
            return;
          }
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: location,
            zoom: 12,
            accessToken: ACCESS_TOKEN,
          });
          const features = response.body.features;
          const parkResults = [];
          for (let i = 0; i < features.length; i++) {
            if (features[i].properties.category !== undefined) {
              if (features[i].properties.category.includes("park")) {
                // Add marker
                new mapboxgl
                  .Marker()
                  .setLngLat(features[i].center)
                  .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                      .setHTML(
                      '<h3>' +
                      features[i].text +
                      '</h3><p>' +
                      features[i].place_name +
                      '</p>'
                      ).on('open', (p) => {
                        const coords = p.target._lngLat;
                        setChosenPark([
                          coords.lng, coords.lat
                        ]);
                      }))
                  .addTo(map);
                parkResults.push(features[i]);
              }
            }
          }
          setParks(parkResults);

          // Add geolocate control to the map
          const geolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          });
          map.addControl(geolocateControl);
          geolocateControl.on('geolocate', (e) => {
            const long = e.coords.longitude;
            const lat = e.coords.latitude;
            setUserLocation([long, lat]);
          });
      });
    }, [userLocation]);

  const isChecked = (p) => {
    if(chosenPark) {
      const [long, lat] = chosenPark;
      const [pLong, pLat] = p.center;
      return pLong === long && pLat === lat;
    }
    return false;
  }

  return (
    <div className="mapBackground">
      <div className="mapHeader">CHOOSE YOUR PARK</div>
      <div id="map"></div>
      <div>
        <input className="mapSearchInput" placeholder="Search nearby parks" height={50}/>
        <div>
        <ul className="mapSearchList">
        {
          parks.map((p) =>
            <li key={p.id} className="mapSearchItem">
              <input
                className="mapSearchItemCheckbox"
                type="checkbox"
                value="selected"
                checked={isChecked(p)}
                onChange={() => {
                  if(isChecked(p)) {
                    setChosenPark(null);
                  } else {
                    setChosenPark(p.center);
                  }
                }}/>
                {p.text}
            </li>)
        }
        </ul>
        </div>
      </div>
      <button
        type="button"
        className="confirmButton"
        disabled={chosenPark === null}
        onClick={() => {
          if(chosenPark) {
            const park = parks.filter((p) => isChecked(p))[0];
            const [long, lat] = park.center;
            createPark({
              name: park.text,
              lat: lat,
              long: long,
            }).then((data) => {
              history.push(`park/${data.data._id}`);
            });
          }
        }}>
        Confirm
      </button>
    </div>
  );
};

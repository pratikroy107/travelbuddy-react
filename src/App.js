import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PleaceDetails/PlaceDetails";

//  to track location - latitude, longitude
/*
if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
        function success(position) {
            // for when getting location is a success
            console.log('latitude', position.coords.latitude,
                'longitude', position.coords.longitude);
        },
        function error(error_message) {
            // for when getting location results in an error
            console.error('An error has occured while retrieving location', error_message)
        }
    )
}
else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
}

*/

const App = () => {

    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    //to track my current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })

    }, [])

    useEffect(() => {
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                //console.log(data);
                setPlaces(data);
            })
    }, [coordinates, bounds]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
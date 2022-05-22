import { Grid, TextField } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React from 'react'
import mapTheme from '../../utils/styles/map-theme'
import Pin from '../../utils/types/Pin';

const markerIcon = require('../../assets/icons/MarkerIcon.png') as string;

const mapContainerStyle = {
    width: '860px',
    height: '200px'
}

const googleMapsOptions = {
    styles: mapTheme,
    streetViewControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false
}

const Maps = ({ coordinates, onClick, onChange, locationName }:
    { coordinates: Pin, onClick: any, onChange: any, locationName: string }) => {

    //Google api key
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <Grid container style={{ maxWidth: 860, display: 'inline' }}>
            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid #619B8A' }}>
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={coordinates} options={googleMapsOptions} onClick={onClick}>
                    {((coordinates.lat !== 0.000000 && coordinates.lng !== 0.000000)) &&
                        < Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} icon={{ url: markerIcon, scaledSize: new window.google.maps.Size(30, 30) }} />
                    }
                </GoogleMap>
            </Grid>
            <Grid>
                {/* Input */}
                <TextField label="Selected location" helperText='Select a location on the map' disabled={true} type="text" required autoComplete='off' placeholder='' variant="outlined"
                    style={{ width: '100%', height: 14 }} onChange={onChange} value={locationName} sx={{ mt: 3 }} />
            </Grid>

        </Grid>
    )
}

export default Maps
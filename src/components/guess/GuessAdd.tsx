import { Container, Grid, Typography } from '@mui/material'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react'
import Guess from '../../common/models/Guess';
import Pin from '../../common/models/Pin';
import mapThemeMono from '../../common/styles/map-theme-mono'

const GuessPlaceholder = require('../../assets/images/guess-placeholder.png') as string;
const markerIcon = require('../../assets/icons/markerIcon.png') as string;

const mapContainerStyle = {
    width: '860px',
    height: '200px'
}

const googleMapsOptions = {
    styles: mapThemeMono,
    streetViewControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false
}

const GuessAdd = () => {
    //Invalid format of latitude and longitude values. (0, 0)
    const [coordinates, setCoordinates] = useState<Pin>({
        lat: 0.000000,
        lng: 0.000000
    });
    const [bestGuesses, setBestGuesses] = useState<Guess[]>();
    const cards = [1, 2, 3, 4];

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAIBPe20QV-J4j0Gl8xJz3OM838b540DT0",
    });

    //Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };


    return (
        <Container style={{ maxWidth: 1400 }} component="form" noValidate={true} onSubmit={handleSubmit} sx={{ my: '2em' }}>
            <Grid container direction="row" style={{ display: 'flex' }}>
                <Grid item xs={8} style={{ background: 'white' }}>
                    <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row' }}>
                        <Typography style={{ fontSize: 34, fontWeight: 400, color: '#233D4D' }}>
                            Take a  <span style={{ color: '#92baaf' }}> Guess</span>!
                        </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex', flexDirection: 'row' }} sx={{ pb: 2 }}>
                        <img style={{ borderRadius: 0, width: '860px', height: '324px' }} src={GuessPlaceholder} />
                    </Grid>

                    <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', border: '2px solid #619B8A', maxWidth: 860 }} sx={{ pt: 0 }}>
                        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={coordinates} options={googleMapsOptions}
                            onClick={(e) => {
                                setCoordinates({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number })
                            }}>

                            {((coordinates.lat !== 0.000000 && coordinates.lng !== 0.000000)) &&
                                <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} icon={{ url: markerIcon, scaledSize: new window.google.maps.Size(30, 30) }} />
                            }

                        </GoogleMap>
                    </Grid>
                </Grid>
                <Grid item xs={4} style={{ background: 'white' }}>
                    123
                </Grid>
            </Grid>
        </Container>
    )
}

export default GuessAdd
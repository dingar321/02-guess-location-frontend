import { Grid, TextField, Typography } from '@mui/material';
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilSnapshot } from 'recoil';
import mapTheme from '../../utils/styles/map-theme'
import Guess from '../../utils/types/Guess';
import Pin from '../../utils/types/Pin';
import { useRecoilState } from 'recoil'
import { GuessedCoordinates, OriginalCoordinates, SelectedLocationUsersGuess } from '../../utils/common/RecoilStates';

//For the line between the cords
//https://stackoverflow.com/questions/66018077/how-to-draw-direction-between-two-points-using-react-google-maps-in-reactjs
//https://stackblitz.com/edit/directionsservice-jot8wk?file=Map.js

const MarkedLocationIcon = require('../../assets/icons/MarkedLocationIcon.png') as string;
const OriginalLocationIcon = require('../../assets/icons/OriginalLocationIcon.png') as string;


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


const MapsDirection = ({ }: {}) => {


    //Google api key
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, });

    //Getting the specified locations guess by the logged user
    const [guess, setGuess] = useRecoilState<Guess>(SelectedLocationUsersGuess);
    //If the location has been guessed we need to get the guessed coordniates
    const [originalCoordinates, setOriginalCoordinates] = useRecoilState<Pin>(OriginalCoordinates);
    const [guessedCoordinates, setGuessedCoordinates] = useRecoilState<Pin>(GuessedCoordinates);


    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <Grid container style={{ maxWidth: 860, display: 'inline' }}>

            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid #619B8A', marginBottom: 20 }}>
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={{ lat: +originalCoordinates.lat as number, lng: +originalCoordinates.lng as number }} options={googleMapsOptions} >

                    <Marker label={{ text: 'Your guess', fontWeight: 'bold', color: "#619B8A" }} position={{ lat: +guessedCoordinates.lat as number, lng: +guessedCoordinates.lng as number }}
                        icon={{ labelOrigin: new window.google.maps.Point(15, -10), url: MarkedLocationIcon, scaledSize: new window.google.maps.Size(20, 30) }} />

                    <Marker label={{ text: 'Pictures location', fontWeight: 'bold', color: "#FF7768" }} position={{ lat: +originalCoordinates.lat as number, lng: +originalCoordinates.lng as number }}
                        icon={{ labelOrigin: new window.google.maps.Point(15, 40), url: OriginalLocationIcon, scaledSize: new window.google.maps.Size(30, 30) }} />


                </GoogleMap>
            </Grid>

            <Grid>
                <Typography>
                    You have guessed <span style={{ fontWeight: 500, color: '#619B8A' }}>  {guess?.locationName} </span> as the pictures location. <br />
                    The photo was taken in <span style={{ fontWeight: 500, color: '#619B8A' }}> {guess?.locationName}</span>. <br />
                    The error distance between the posted location and your guess is: <span style={{ fontWeight: 500, color: '#619B8A' }}> {guess?.errorDistanceKm} km.</span> <br />
                </Typography>
            </Grid>

        </Grid >
    )
}

export default MapsDirection
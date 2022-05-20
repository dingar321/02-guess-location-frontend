import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import mapThemeMono from '../utils/styles/map-theme'

import GuessCard from '../components/cards/UserGuessCard';
import Pin from '../utils/types/Pin';


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
    const [coordinates, setCoordinates] = useState<Pin>({ lat: 0.000000, lng: 0.000000 });
    const [cordChanged, setChordChanged] = useState<boolean>(false);
    const [locationName, setLocationName] = useState<string>('');


    const [alreadyGuessed, setAlreadyGuessed] = useState<boolean>(false);

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    //Google api key
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, });

    useEffect(() => {
        if (cordChanged) {
            setChordChanged(false);
            const options = {
                method: 'GET',
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}`,
            };

            axios.request(options).then(function (response) {
                //console.log(response.data.results[2].formatted_address);
                setLocationName(response.data.results[2].formatted_address)
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, [cordChanged])

    useEffect(() => {

    }, [locationName])

    //Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <Container style={{ maxWidth: 1400 }} component="form" noValidate={true} onSubmit={handleSubmit} sx={{ my: '0em' }}>
            <Grid container direction="row" style={{ display: 'flex' }}>
                <Grid item xs={8} style={{ background: 'white' }}>
                    <Grid style={{ background: 'white', display: 'flex' }}>
                        <Typography style={{ fontSize: 30, fontWeight: 400, color: '#233D4D' }}>
                            Take a  <span style={{ color: '#92baaf' }}> Guess</span>!
                        </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex' }} sx={{ pb: 2 }}>
                        <img style={{ borderRadius: 0, width: '860px', height: '324px' }} src={GuessPlaceholder} />
                    </Grid>
                    <Grid>
                        <Typography style={{ fontSize: 12, fontWeight: 400, color: '#233D4D' }}>
                            Select the location, where you think this photo was taken:
                        </Typography>
                    </Grid>
                    <Grid style={{ background: 'white', display: 'flex', border: '2px solid #619B8A', maxWidth: 860 }} sx={{ pt: 0 }}>
                        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={coordinates} options={googleMapsOptions}
                            onClick={(e) => {
                                setCoordinates({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number });
                                setChordChanged(true);
                            }}>

                            {((coordinates.lat !== 0.000000 && coordinates.lng !== 0.000000)) &&
                                <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} icon={{ url: markerIcon, scaledSize: new window.google.maps.Size(30, 30) }} />
                            }

                        </GoogleMap>
                    </Grid>

                    {((!alreadyGuessed)) &&
                        <>
                            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', }} sx={{ pt: 1 }}>
                                <TextField label="Location name, select a location on the map" disabled={true} type="text" required autoComplete='off' placeholder=''
                                    variant="outlined" style={{ width: 860, height: 14 }} onChange={(e) => setLocationName(e.target.value)} value={locationName} />
                            </Grid >
                            <Grid style={{ background: 'white', display: 'flex' }} sx={{ pt: 6 }}>
                                <Button type="submit">ADD</Button>
                            </Grid>
                        </>
                    }
                    {((alreadyGuessed)) &&
                        <>
                            <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', }} sx={{ pt: 1 }}>
                                <Typography>
                                    You have guessed <span style={{ fontWeight: 500, color: '#233D4D' }}> "Brooklyn, New York, United States" </span> for this location. <br />
                                    The error distance is between the posted location and your guess is: <span style={{ fontWeight: 500, color: '#233D4D' }}>"231 m"</span> <br />
                                    The photo was taken in <span style={{ fontWeight: 500, color: '#233D4D' }}>"location"</span>.
                                </Typography>
                            </Grid>
                        </>
                    }

                </Grid>
                <Grid item xs={4} style={{ background: 'white' }}>
                    <Grid style={{ background: 'white', display: 'flex' }}>
                        <Typography style={{ fontSize: 30, fontWeight: 400, color: '#000000' }}>
                            Leaderboard
                        </Typography>
                    </Grid>
                    <Grid>
                        {cards.map((card) => (
                            <div style={{ padding: 5 }}>
                                <GuessCard rank={1} />
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Grid>




        </Container >
    )
}

export default GuessAdd
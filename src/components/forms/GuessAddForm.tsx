import { Box, Button, Container, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pin from '../../utils/types/Pin';
import GuessCard from '../cards/GuessCard';
import UserGuessCard from '../cards/UserGuessCard';
import Maps from '../map/Maps';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import Location from '../../utils/types/Location';
import { AlreadyGuessed, GuessedCoordinates, OriginalCoordinates, SelectedLocation, SelectedLocationsBestGuesses, SelectedLocationUsersGuess, UserGuesses, UserState } from '../../utils/common/RecoilStates';
import Guess from '../../utils/types/Guess';
import ErrorIcon from '@mui/icons-material/Error';
import User from '../../utils/types/User';
import MapsDirection from '../map/MapsDirection';

const GuessAddForm = () => {

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Values provided by the use
    const [coordinates, setCoordinates] = useState<Pin>({ lat: 0.000000, lng: 0.000000 });
    const [cordChanged, setChordChanged] = useState<boolean>(false);
    const [locationName, setLocationName] = useState<string>('');

    //Checks if the current location was already guessed by the logged user
    const [alreadyGuessed, setAlreadyGuessed] = useRecoilState<boolean>(AlreadyGuessed);
    //Selected location for redirect
    const [selectedLocation, setSelectedLocation] = useRecoilState<Location>(SelectedLocation);
    //We need to get the locations best guesses as well
    const [selectedLocationsBestGuesses, setSelectedLocationsBestGuesses] = useRecoilState<Guess[]>(SelectedLocationsBestGuesses);
    //Getting and saving the user to a global state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);
    //Users guesses
    const [userGuesses, setUserGuesses] = useRecoilState<number[]>(UserGuesses);
    //Getting the specified locations guess by the logged user
    const [guess, setGuess] = useRecoilState<Guess>(SelectedLocationUsersGuess);
    //If the location has been guessed we need to get the guessed coordniates
    const [originalCoordinates, setOriginalCoordinates] = useRecoilState<Pin>(OriginalCoordinates);
    const [guessedCoordinates, setGuessedCoordinates] = useRecoilState<Pin>(GuessedCoordinates);

    //If the page refreshes
    useEffect(() => {
        //Getting the specific location
        const urlLocationId = window.location.href;
        const locationId: number = Number(urlLocationId.split('?').pop());

        //Reloading the selected locations data
        const fetchMostRecentLocation = async () => {
            const url = 'http://localhost:3333/location/' + locationId as string;
            axios({
                method: "GET",
                url: url,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(async function (response) {
                setSelectedLocation(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        fetchMostRecentLocation();

        //Reloading the personal best guesses for the location
        const fetchLocationsGuesses = async () => {
            const url = `http://localhost:3333/guess/for-location?locationId=${locationId}&limit=12`
            axios({
                method: "GET",
                url: url,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(async function (response) {
                setSelectedLocationsBestGuesses(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        fetchLocationsGuesses();

        //Reloading and checking if the user already guessed the location
        const fetchLoggedUser = async () => {
            await axios(
                {
                    method: 'POST',
                    url: 'http://localhost:3333/auth/user',
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            ).then(response => {

                response.data.guesses.forEach((element: number) => {
                    if (element === locationId) {
                        setAlreadyGuessed(true);
                    }
                });
            }).catch(error => {
                //console.log('Signup error: ', error)
            });
        }
        fetchLoggedUser();

        //Getting the specific locations guess by the user
        const fetchLocationUsersGuess = async () => {
            const url = `http://localhost:3333/guess/users-location-guess/${locationId}`
            axios({
                method: "GET",
                url: url,
                withCredentials: true,
            }).then(async function (response) {
                //save the guessed coordinates
                setGuess(response.data)
                setGuessedCoordinates({ lat: response.data.latitude as number, lng: response.data.longitude as number });
                setOriginalCoordinates({ lat: response.data.locationTk.latitude as number, lng: response.data.locationTk.longitude as number });
            }).catch(error => {
                console.log(error);
            });
        }
        fetchLocationUsersGuess();
    }, [])

    //reload everything if changes
    useEffect(() => {
        //Getting the specific location
        const urlLocationId = window.location.href;
        const locationId: number = Number(urlLocationId.split('?').pop());

        //Getting the specific locations guess by the user
        const fetchLocationUsersGuess = async () => {
            const url = `http://localhost:3333/guess/users-location-guess/${locationId}`
            axios({
                method: "GET",
                url: url,
                withCredentials: true,
            }).then(async function (response) {
                //save the guessed coordinates
                setGuess(response.data)
                setGuessedCoordinates({ lat: response.data.latitude as number, lng: response.data.longitude as number });
                setOriginalCoordinates({ lat: response.data.locationTk.latitude as number, lng: response.data.locationTk.longitude as number });
            }).catch(error => {
                console.log(error);
            });
        }
        fetchLocationUsersGuess();

        //Reloading the personal best guesses for the location
        const fetchLocationsGuesses = async () => {
            const url = `http://localhost:3333/guess/for-location?locationId=${locationId}&limit=12`
            axios({
                method: "GET",
                url: url,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(async function (response) {
                setSelectedLocationsBestGuesses(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        fetchLocationsGuesses();
    }, [alreadyGuessed])

    //setting location after selecting a location on the map
    useEffect(() => {
        if (cordChanged) {
            setChordChanged(false);
            axios({
                method: 'GET',
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}`,
            }).then(async function (response) {
                //Getting and setting the location name
                setLocationName(response.data.results[2].formatted_address)
            }).catch(error => {
                console.error('Error: ', error);
            });
        }
    }, [cordChanged])

    //Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('trig');
        if (coordinates.lat != 0.000000 && coordinates.lng != 0.000000) {
            {/* Provided values are valid */ }
            var bodyFormData = new FormData();
            bodyFormData.append('locationName', locationName);
            bodyFormData.append('latitude', coordinates.lat as any);
            bodyFormData.append('longitude', coordinates.lng as any);

            //For testing
            //console.log('Added guesses cords: ', coordinates.lat, coordinates.lng);

            axios({
                method: "POST",
                url: 'http://localhost:3333/guess/add/' + selectedLocation.locationId as string,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }).then(function (response) {
                //Empty all of the fields
                setCoordinates({ lat: 0.000000, lng: 0.000000 });
                setChordChanged(false);
                setLocationName('');
                setAlreadyGuessed(true);
            }).catch(error => {
                console.log(error);
                errorRef.current?.focus();
            });
        } else {
            {/* coordinates missing */ }
            setErrorMessage('Please select a location');
            console.log('Error');
            errorRef.current?.focus();
        }
    };

    return (
        <Container style={{ maxWidth: 1400 }} component="form" noValidate={true} onSubmit={handleSubmit} sx={{ my: '0em' }}>
            <Grid container direction="row" style={{ display: 'flex', background: 'white' }}>
                {/* First column */}
                <Grid item xs={8} style={{ background: 'white' }}>

                    <Grid style={{ background: 'white', display: 'flex' }}>
                        <Typography style={{ fontSize: 30, fontWeight: 400, color: '#233D4D' }}>
                            Take a <span style={{ color: '#92baaf' }}> Guess</span>!
                        </Typography>
                    </Grid>

                    <Grid style={{ display: 'flex' }} sx={{ pb: 2 }}>
                        <div style={{ backgroundColor: '#C8D7D4', border: '2px solid #619B8A', width: '860px', height: '280px', color: '#619B8A', fontSize: 12, textAlign: 'center' }}>
                            <img style={{ maxWidth: '470px', height: '276px', objectFit: 'contain', aspectRatio: '16 / 9' }} src={selectedLocation.s3Imagekey} />
                        </div>
                    </Grid>

                    {(!alreadyGuessed) &&
                        <>
                            <Grid>
                                <Typography style={{ fontSize: 12, fontWeight: 400, color: '#233D4D' }}>
                                    Select the location, where you think this photo was taken:
                                </Typography>
                            </Grid>

                            <Grid style={{ background: 'white', display: 'flex', maxWidth: 860 }}>
                                {/* Google maps */}
                                <Maps locationName={locationName} coordinates={coordinates} onChange={(e: any) => setLocationName(e.target.value)} onClick={(e: any) => {
                                    setCoordinates({ lat: e.latLng?.lat() as number, lng: e.latLng?.lng() as number });
                                    setChordChanged(true);
                                }} />
                            </Grid>

                            <Grid style={{ background: 'white', width: '100%' }} sx={{ mt: 8 }}>
                                <Button type='submit' style={{ float: 'right', width: 137, height: 40, background: "#619B8A", color: "#FFFFFF", fontSize: 16, fontWeight: 400 }}>GUESS</Button>
                            </Grid>

                            <Box style={{ color: 'red', paddingTop: 10 }}>
                                {/* TODO: Move to a dialog <--------------------------------- */}
                                <Typography ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</Typography>
                            </Box>
                        </>
                    }
                    {((alreadyGuessed)) &&
                        <Grid style={{ background: 'white', display: 'flex', flexDirection: 'row', }}>
                            {/* 

                            */}
                            <MapsDirection />
                        </Grid>
                    }
                </Grid>


                {/* Second column - LEADERBOARD*/}
                <Grid item xs={4} style={{ background: 'white' }}>
                    <Grid style={{ background: 'white', display: 'flex' }}>
                        <Typography style={{ fontSize: 30, fontWeight: 400, color: '#000000' }}>
                            Leaderboard
                        </Typography>
                    </Grid>
                    <Grid>
                        {selectedLocationsBestGuesses.map((user) => (
                            <div style={{ padding: 5 }} key={user.guessId}>
                                <UserGuessCard userGuess={user} />
                            </div>
                        ))}
                        {(selectedLocationsBestGuesses.length === 0) &&
                            <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 13, textAlign: 'center' }}   >
                                <ErrorIcon /><br />
                                The locations doesnt have any guesses yet ...
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GuessAddForm
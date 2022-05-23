import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../buttons/OutlinedButton';
import { MostRecentLocationsLogged, PersonalBestGuessesLogged, UserGuesses, UserState } from '../../utils/common/RecoilStates';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'
import GuessCard from '../cards/GuessCard';
import LocationCard from '../cards/LocationCard';
import axios from 'axios';
import Location from '../../utils/types/Location';
import Guess from '../../utils/types/Guess';
import ErrorIcon from '@mui/icons-material/Error';

const LoggedIn = () => {

    //Getting and saving the user to a global state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);


    //saving the locaitons
    const [mostRecentLocationsLogged, setMostRecentLocationsLogged] = useRecoilState<Location[]>(MostRecentLocationsLogged);
    const [loadMoreLocations, setLoadMoreLocations] = useState<boolean>(false);
    const [paginateNumberLocations, setPaginateNumberLocations] = useState<number>(3);

    //Saving the persnoal guesses
    const [personalBestGuesses, setPersonalBestGuesses] = useRecoilState<Guess[]>(PersonalBestGuessesLogged);
    const [loadMoreBestGuesses, setLoadMoreBestGuesses] = useState<boolean>(false);
    const [paginateNumberBestGuesses, setPaginateNumbetBestGuesses] = useState<number>(3);

    useEffect(() => {
        //First we get the most recent locations
        const fetchMostRecentPosts = async () => {
            const url = 'http://localhost:3333/location/list?limit=' + paginateNumberLocations as string;
            const response = await axios.get(url);

            //We need to remove the logged users locations and all of his already guessed locations
            const locationArray: Location[] = response.data;
            for (var i = locationArray.length - 1; i >= 0; --i) {
                //Removes logged users location from the array!
                if (locationArray[i].userTk.userId === loggedUser.userId) {
                    locationArray.splice(i, 1);
                }
            }

            const guessesArray: number[] = loggedUser.guesses;
            for (var i = locationArray.length - 1; i >= 0; --i) {
                for (var j = guessesArray.length - 1; j >= 0; --j) {
                    //Removes the already guessed locations from the array
                    if (locationArray[i].locationId === guessesArray[j]) {
                        locationArray.splice(i, 1);
                    }
                }
            }

            setMostRecentLocationsLogged(locationArray);
        }
        fetchMostRecentPosts();

        //Personal best guesses
        const fetchPersonalGusess = async () => {
            const url = 'http://localhost:3333/guess/for-user?limit=' + paginateNumberBestGuesses as string;
            axios({
                method: "GET",
                url: url,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(async function (response) {
                setPersonalBestGuesses(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        fetchPersonalGusess();
    }, [])

    useEffect(() => {

    }, [mostRecentLocationsLogged, personalBestGuesses])

    /* -------------- */

    //Get more best guesses
    useEffect(() => {
        if (loadMoreBestGuesses) {
            setLoadMoreBestGuesses(false);
            setPaginateNumbetBestGuesses(paginateNumberBestGuesses + 3)
            //Personal best guesses
            const fetchPersonalGusess = async () => {
                const url = 'http://localhost:3333/guess/for-user?limit=' + paginateNumberBestGuesses as string;
                axios({
                    method: "GET",
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }).then(async function (response) {
                    setPersonalBestGuesses(response.data);
                }).catch(error => {
                    console.log(error);
                });
            }
            fetchPersonalGusess();
        }
    }, [loadMoreBestGuesses])

    //Get more locations
    useEffect(() => {
        if (loadMoreLocations) {
            setLoadMoreLocations(false);
            setPaginateNumberLocations(paginateNumberBestGuesses + 3)
            //Locatios
            const fetchMostRecentLocations = async () => {
                const url = 'http://localhost:3333/location/list?limit=' + paginateNumberBestGuesses as string;
                const response = await axios.get(url);

                const locationArray: Location[] = response.data;

                for (var i = locationArray.length - 1; i >= 0; --i) {
                    //Removes logged users locatiaon posts!
                    if (locationArray[i].userTk.userId === loggedUser.userId) {
                        locationArray.splice(i, 1);
                    }
                }

                for (var i = locationArray.length - 1; i >= 0; --i) {
                    for (var j = loggedUser.guesses.length - 1; i >= 0; --i) {
                        //Removes logged users locatiaon posts!
                        if (locationArray[i].userTk.userId === loggedUser.guesses[j]) {
                            locationArray.splice(i, 1);
                        }
                    }
                }
                setMostRecentLocationsLogged(locationArray);
            }
            fetchMostRecentLocations();
        }
    }, [loadMoreLocations])

    useEffect(() => {
    }, [loggedUser])



    return (
        <Container style={{ maxWidth: 1600 }} >
            <Grid sx={{ mt: 5 }}>
                {/* Location views */}
                <Grid style={{ textAlign: 'center' }}>
                    <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 34, }} sx={{ pb: 1 }}>
                        Personal best guesses
                    </Typography>
                    <Typography style={{ color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 16, }} sx={{ pb: 5 }}>
                        Your personal best guesses appear here. <br /> Go on and try to beat your personal records or set a new one!
                    </Typography>
                </Grid>
                <Grid container spacing={personalBestGuesses.length} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {personalBestGuesses.map((guess) => (
                        <div style={{ padding: 5 }} key={guess.guessId}>
                            <GuessCard width={420} height={240}
                                guessObject={guess} />
                        </div>
                    ))}
                    {(personalBestGuesses.length === 0) &&
                        <Typography style={{ color: '#b7d164', background: 'white', fontWeight: 400, fontSize: 13, textAlign: 'center' }}   >
                            <ErrorIcon /><br />
                            You dont have any guesses yet...
                        </Typography>
                    }
                </Grid>
                <Grid style={{ textAlign: 'center' }} >
                    {(personalBestGuesses.length !== 0) &&
                        <OutlinedButton type='button' height={40} width={132} buttonText='LOAD MORE' fontWeight={400} fontSize={16} color='#619B8A' borderColor='#619B8A'
                            sx={{ mt: 3, mb: 3 }} onClick={(e: any) => setLoadMoreBestGuesses(true)} background='#FFFFFF' />
                    }
                </Grid >
            </Grid>

            <Grid sx={{ mt: 5 }}>
                {/* Location views */}
                <Grid style={{ textAlign: 'center' }}>
                    <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 34, }} sx={{ pb: 1, pt: 4 }}>
                        New locations
                    </Typography>
                    <Typography style={{ color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 16, }} sx={{ pb: 5 }}>
                        New uploads from users. <br />Try to guess all the locations by pressing on a picture.
                    </Typography>
                </Grid>

                <Grid container spacing={mostRecentLocationsLogged.length} style={{
                    background: 'white', display: 'flex',
                    flexDirection: 'row', justifyContent: 'center'
                }}>
                    {mostRecentLocationsLogged.map((location) => (
                        <div style={{ padding: 5 }} key={location.locationId}>
                            <LocationCard width={420} height={240}
                                locationObject={location} />
                        </div>
                    ))}
                    {(mostRecentLocationsLogged.length === 0) &&
                        <Typography style={{ color: '#b7d164', background: 'white', fontWeight: 400, fontSize: 13, textAlign: 'center' }}   >
                            <ErrorIcon /><br />
                            There are currenty no posts available...
                        </Typography>
                    }
                </Grid>

                <Grid style={{ textAlign: 'center' }} >
                    {(mostRecentLocationsLogged.length !== 0) &&
                        <OutlinedButton type='button' height={40} width={132} buttonText='LOAD MORE' fontWeight={400} fontSize={16} color='#619B8A' borderColor='#619B8A'
                            sx={{ mt: 3, mb: 3 }} onClick={(e: any) => setLoadMoreLocations(true)} background='#FFFFFF' />
                    }
                </Grid >
            </Grid >

        </Container >
    )
}

export default LoggedIn


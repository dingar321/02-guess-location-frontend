import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../buttons/OutlinedButton';
import { MostRecentLocationsLogged, PersonalBestGuessesLogged, UserState } from '../../utils/common/RecoilStates';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'
import GuessCard from '../cards/GuessCard';
import LocationCard from '../cards/LocationCard';
import axios from 'axios';
import Location from '../../utils/types/Location';
import Guess from '../../utils/types/Guess';
import ErrorIcon from '@mui/icons-material/Error';
import { PaginateNumberBestGuesses, PaginateNumberLocations } from '../../utils/common/RecoilPaginationStates';

const LoggedIn = () => {

    //TODO: For pagination set the amount of pages that i have in the session !!

    //User state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //Location array and pagination states
    const [mostRecentLocationsLogged, setMostRecentLocationsLogged] = useRecoilState<Location[]>(MostRecentLocationsLogged);
    const [paginateNumberLocations, setPaginateNumberLocations] = useRecoilState<number>(PaginateNumberLocations);

    //Best guesses array and pagination states
    const [personalBestGuesses, setPersonalBestGuesses] = useRecoilState<Guess[]>(PersonalBestGuessesLogged);
    const [paginateNumberBestGuesses, setPaginateNumbetBestGuesses] = useRecoilState<number>(PaginateNumberBestGuesses);

    useEffect(() => {
        //We get the locations
        const fetchMostRecentLocations = async () => {
            const url = 'http://localhost:3333/location/list-excluded?limit=3';
            axios({
                method: "GET",
                url: url,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(async function (response) {
                //console.log('Initial Call: ', url);
                setMostRecentLocationsLogged(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        //We get the best guesses
        const fetchPersonalGusses = async () => {
            const url = 'http://localhost:3333/guess/for-user?limit=3';
            axios({
                method: "GET",
                url: url,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(async function (response) {
                //console.log('Initial Call: ', url);
                setPersonalBestGuesses(response.data);
            }).catch(error => {
                console.log(error);
            });
        }

        //Excecute the calls 
        fetchPersonalGusses();
        fetchMostRecentLocations();
    }, [])

    //Re render if the arrays change 
    useEffect(() => {
    }, [mostRecentLocationsLogged, personalBestGuesses])

    const LoadMoreLocations = () => {
        //When pressed we load more locations. (number of specified in the pagination state)
        const url = 'http://localhost:3333/location/list-excluded?limit=' + paginateNumberLocations as string;
        axios({
            method: "GET",
            url: url,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }).then(async function (response) {
            //console.log('Additional Call: ', url);
            setPaginateNumberLocations(paginateNumberLocations + 3)
            //setMostRecentLocationsLogged([...mostRecentLocationsLogged, ...response.data]);
            setMostRecentLocationsLogged(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const LoadMorePersonalBestGuesses = () => {
        const url = 'http://localhost:3333/guess/for-user?limit=' + paginateNumberBestGuesses as string;
        axios({
            method: "GET",
            url: url,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }).then(async function (response) {
            //console.log('Additional Call: ', url);
            setPaginateNumbetBestGuesses(paginateNumberBestGuesses + 3)
            setPersonalBestGuesses(response.data);
        }).catch(error => {
            console.log(error);
        });
    }



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
                        <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 13, textAlign: 'center' }}   >
                            <ErrorIcon /><br />
                            You dont have any guesses yet...
                        </Typography>
                    }
                </Grid>
                <Grid style={{ textAlign: 'center' }} >
                    {(personalBestGuesses.length !== 0) &&
                        <OutlinedButton type='button' height={40} width={132} buttonText='LOAD MORE' fontWeight={400} fontSize={16} color='#619B8A' borderColor='#619B8A'
                            sx={{ mt: 3, mb: 3 }} onClick={LoadMorePersonalBestGuesses} background='#FFFFFF' />
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

                <Grid container spacing={mostRecentLocationsLogged.length} style={{ paddingTop: 20, background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {mostRecentLocationsLogged.map((location) => (
                        <div style={{ padding: 5 }} key={location.locationId}>
                            <LocationCard width={420} height={240}
                                locationObject={location} />
                        </div>
                    ))}
                    {(mostRecentLocationsLogged.length === 0) &&
                        <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 13, textAlign: 'center' }}   >
                            <ErrorIcon /><br />
                            There are currenty no posts available...
                        </Typography>
                    }
                </Grid>

                <Grid style={{ textAlign: 'center' }} >
                    {(mostRecentLocationsLogged.length !== 0) &&
                        <OutlinedButton type='button' height={40} width={132} buttonText='LOAD MORE' fontWeight={400} fontSize={16} color='#619B8A' borderColor='#619B8A'
                            sx={{ mt: 3, mb: 3 }} onClick={LoadMoreLocations} background='#FFFFFF' />
                    }
                </Grid >
            </Grid >

        </Container >
    )
}

export default LoggedIn


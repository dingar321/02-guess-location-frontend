import { Button, ButtonBase, Card, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AlreadyGuessed, SelectedLocation, SelectedLocationsBestGuesses, UserGuesses, UserState } from '../../utils/common/RecoilStates';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Location from '../../utils/types/Location';
import Guess from '../../utils/types/Guess';

const poppinsFont = "'Poppins', sans-serif";
const editIcon = require('../../assets/icons/EditIcon.png') as string;
const lockIcon = require('../../assets/icons/LockIcon.png') as string;
const guessGradient = require('../../assets/filters/GuessGradient.png') as string;

const LocationCard = ({ width, height, locationObject }:
    { width: number, height: number, locationObject: Location }) => {

    //navigation between pages
    const navigate = useNavigate();

    //The ability to have diffrent sized cards
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);

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

    useEffect(() => {
        setCardWidth(width);
        setCardHeight(height);
    }, [])

    const addGuess = () => {

        //Preloading the selected locations data
        setSelectedLocation(locationObject);

        //Preloading the personal best guesses for the location
        const fetchPersonalGusess = async () => {
            const url = `http://localhost:3333/guess/for-location?locationId=${locationObject.locationId}&limit=12`
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
        fetchPersonalGusess();

        //Preloading and checking if the user already guessed the location
        userGuesses.forEach(element => {
            if (element === locationObject.locationId) {
                setAlreadyGuessed(true);
            }

            if (element !== locationObject.locationId) {
                setAlreadyGuessed(false);
            }
        });

        navigate('/add-guess/?' + locationObject.locationId);
    }

    return (
        <>
            {((loggedUser.userId !== 0)) &&
                <Card style={{ width: cardWidth, height: cardHeight, cursor: 'pointer', borderRadius: 10 }} elevation={1} onClick={addGuess}>
                    <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute', borderRadius: 10 }} component="img"
                        image={locationObject.s3Imagekey} /> {/* <-- Image*/}
                </Card >
            }


            {((loggedUser.userId === 0)) &&
                <Card style={{ width: cardWidth, height: cardHeight, borderRadius: 10 }} elevation={1}>
                    <ButtonBase disabled component="div" style={{ width: cardWidth, height: cardHeight, position: "relative" }}>
                        <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute', borderRadius: 10 }} component="img"
                            image={locationObject.s3Imagekey} /> {/* <-- Image*/}
                        <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute' }} component="img" image={guessGradient} />
                        <IconButton disabled style={{ width: 24, height: 32, position: "absolute", borderRadius: 10 }}>
                            <img style={{ width: 24, height: 32 }} src={lockIcon} />
                        </IconButton >
                    </ButtonBase>
                    {/*
                     */}
                </Card >
            }
        </>
    )
}

export default LocationCard
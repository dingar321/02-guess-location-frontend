import { useEffect, useState } from 'react'
import { ButtonBase, Card, CardMedia, Typography } from '@mui/material';
import { AlreadyGuessed, GuessedCoordinates, OriginalCoordinates, SelectedLocation, SelectedLocationsBestGuesses, SelectedLocationUsersGuess, UserGuesses, UserState } from '../../utils/common/RecoilStates';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import Guess from '../../utils/types/Guess';
import axios from 'axios';
import Location from '../../utils/types/Location';
import Pin from '../../utils/types/Pin';

const poppinsFont = "'Poppins', sans-serif";
const guessGradient = require('../../assets/filters/GuessGradient.png') as string;

const GuessCard = ({ width, height, guessObject }:
    { width: number, height: number, guessObject: Guess }) => {

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
    //Getting the specified locations guess by the logged user
    const [guess, setGuess] = useRecoilState<Guess>(SelectedLocationUsersGuess);
    //If the location has been guessed we need to get the guessed coordniates
    const [originalCoordinates, setOriginalCoordinates] = useRecoilState<Pin>(OriginalCoordinates);
    const [guessedCoordinates, setGuessedCoordinates] = useRecoilState<Pin>(GuessedCoordinates);

    useEffect(() => {
        setCardWidth(width);
        setCardHeight(height);
    }, [])

    const goToGuessedLocation = () => {

        //Preloading the selected locations data
        setSelectedLocation(guessObject.locationTk);

        //Preloading the personal best guesses for the location
        const fetchPersonalGusess = async () => {
            const url = `http://localhost:3333/guess/for-location?locationId=${guessObject.locationTk.locationId}&limit=12`
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
            if (element === guessObject.locationTk.locationId) {
                setAlreadyGuessed(true);
            }

            if (element !== guessObject.locationTk.locationId) {
                setAlreadyGuessed(false);
            }
        });

        //Preloading the specific locations guess by the user
        const fetchLocationUsersGuess = async () => {
            const url = `http://localhost:3333/guess/users-location-guess/${guessObject.locationTk.locationId}`
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

        navigate('/add-guess/?' + guessObject.locationTk.locationId);
    }

    return (
        <Card style={{ width: cardWidth, height: cardHeight, cursor: 'pointer', borderRadius: 10 }} sx={{}} elevation={1} onClick={goToGuessedLocation} >
            <ButtonBase component="div" style={{ position: "relative" }}>
                <CardMedia style={{ width: cardWidth, height: cardHeight }} component="img"
                    image={guessObject.locationTk.s3Imagekey} /> {/* <-- Image*/}
                <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute' }} component="img" image={guessGradient} />
                <Typography style={{ position: "absolute", fontFamily: poppinsFont, fontWeight: 700, fontSize: 24, color: "white", transform: 'translate(-50 %, -50 %)', }}>
                    {guessObject.errorDistanceKm} km
                </Typography>
            </ButtonBase>
        </Card >
    );
}

export default GuessCard
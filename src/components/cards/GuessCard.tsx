import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, ButtonBase, Card, CardContent, CardMedia, createMuiTheme, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { number } from 'yup';
import { UserState } from '../../utils/common/UserRecoil';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'

const poppinsFont = "'Poppins', sans-serif";
const guessGradient = require('../../assets/filters/GuessGradient.png') as string;
const guessPlaceholder = require('../../assets/images/GuessPlaceholder.png') as string;

const GuessCard = ({ width, height }: { width: number, height: number }) => {

    //The ability to have diffrent sized cards
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);

    //If user exists
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    useEffect(() => {
        setCardWidth(width);
        setCardHeight(height);
    }, [])

    return (
        <Card style={{ width: cardWidth, height: cardHeight, cursor: 'pointer', borderRadius: 10 }} sx={{}} elevation={1} >
            <ButtonBase component="div" style={{ position: "relative" }}>
                <CardMedia style={{ width: cardWidth, height: cardHeight }} component="img"
                    image={guessPlaceholder} /> {/* <-- Image*/}
                <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute' }} component="img" image={guessGradient} />
                <Typography style={{ position: "absolute", fontFamily: poppinsFont, fontWeight: 700, fontSize: 24, color: "white", transform: 'translate(-50 %, -50 %)', }}> 256 m</Typography>
            </ButtonBase>
        </Card >
    );
}

export default GuessCard
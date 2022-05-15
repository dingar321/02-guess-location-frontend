import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, ButtonBase, Card, CardContent, CardMedia, createMuiTheme, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { number } from 'yup';
import User from '../../common/models/User';

//Font:
const poppinsFont = "'Poppins', sans-serif";

//Images
const GuessFilter = require('../../assets/filters/guess-filter.png') as string;
const GuessPlaceholder = require('../../assets/images/guess-placeholder.png') as string;



const GuessCard = ({ width, height }: { width: number, height: number }) => {

    //The ability to have diffrent sized cards
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);

    //If user exists
    const [user, setUser] = useState<User>();
    const [userLogged, setUserLogged] = useState<boolean>(false);

    useEffect(() => {
        setCardWidth(width);
        setCardHeight(height);
    }, [])

    return (
        <Card style={{ width: cardWidth, height: cardHeight, cursor: 'pointer', borderRadius: 10 }} sx={{}} elevation={1} >
            <ButtonBase component="div" style={{ position: "relative" }}>
                <CardMedia style={{ width: cardWidth, height: cardHeight }} component="img"
                    image={GuessPlaceholder} /> {/* <-- Image*/}
                <CardMedia style={{ width: cardWidth, height: cardHeight, position: 'absolute' }} component="img" image={GuessFilter} />
                <Typography style={{ position: "absolute", fontFamily: poppinsFont, fontWeight: 700, fontSize: 24, color: "white", transform: 'translate(-50 %, -50 %)', }}> 256 m</Typography>
            </ButtonBase>
        </Card >
    );
}

export default GuessCard
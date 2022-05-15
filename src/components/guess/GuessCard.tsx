import React, { useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, ButtonBase, Card, CardContent, CardMedia, createMuiTheme, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { number } from 'yup';

//Font:
const poppinsFont = "'Poppins', sans-serif";

//Images
const GuessFilter = require('../../assets/filters/guess-filter.png') as string;
const GuessPlaceholder = require('../../assets/images/guess-placeholder.png') as string;

const GuessCard = () => {

    const [imagePath, setImagePath] = useState<string>('');
    const [errorDistance, setErrorDistance] = useState<number>(-1);

    return (
        < Card style={{ width: 310, height: 175, cursor: 'pointer' }} elevation={1} >
            {((!imagePath)) &&
                <ButtonBase component="div" style={{ position: "relative" }}>
                    {/* Exists */}
                    <CardMedia style={{ width: 310, height: 175 }} component="img" image={GuessPlaceholder} />
                    <CardMedia style={{ width: 310, height: 175, position: 'absolute' }} component="img" image={GuessFilter} />
                    <Typography style={{ position: "absolute", fontFamily: poppinsFont, fontWeight: 700, fontSize: 24, color: "white", transform: 'translate(-50 %, -50 %)', }}> 256 m</Typography>
                </ButtonBase>
            }
        </Card >
    );
}

export default GuessCard
import { Button, ButtonBase, Card, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'


//Font:
const poppinsFont = "'Poppins', sans-serif";

//Images
const GuessPlaceholder = require('../../assets/images/guess-placeholder.png') as string;
const EditIcon = require('../../assets/icons/edit-icon.png') as string;


const LocationCard = () => {
    return (
        <Card style={{ width: 310, height: 175, cursor: 'pointer', borderRadius: 10 }} elevation={1}>
            <CardMedia style={{ width: 310, height: 175, position: 'absolute', borderRadius: 10 }} component="img"
                image={GuessPlaceholder} /> {/* <-- Image*/}
            <IconButton style={{ position: "absolute", borderRadius: 10 }}>
                <img src={EditIcon} />
            </IconButton >
        </Card >
    )
}

export default LocationCard
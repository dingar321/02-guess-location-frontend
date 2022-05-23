import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Guess from '../utils/types/Guess';
import GuessCard from '../components/cards/GuessCard';
import LocationCard from '../components/cards/LocationCard';

const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const Profile = () => {

    const [userBestGuesses, setUserBestGuesses] = useState<Guess[]>();
    const cards = [1, 2, 3, 4];

    return (
        <Container style={{ maxWidth: 1600 }} sx={{ my: '5em' }}>
            <Grid>
                <Grid style={{ display: 'flex', flexDirection: 'row' }} sx={{ pb: 7 }}>
                    <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 64, height: 64 }} /> </Typography>
                    <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 34, paddingTop: 8, paddingLeft: 30 }} >User</Typography>
                </Grid >
            </Grid>

            <Grid>
                <Grid container>
                    <Typography style={{ paddingRight: 20, color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 24, }} sx={{ pb: 5 }}>
                        My best guesses
                    </Typography>
                </Grid>
                <Grid container spacing={4} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/*
                    {cards.map((card) => (
                        <div style={{ padding: 5 }}>
                            <GuessCard width={310} height={175} />
                        </div>
                    ))}*/}
                </Grid>
                <Grid style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                    <Button> LOAD MORE </Button>
                </Grid >
            </Grid>

            <Grid>
                <Grid container>
                    <Typography style={{ paddingRight: 20, color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 24, }} sx={{ pb: 5 }}>
                        My posted locations
                    </Typography>
                </Grid>
                <Grid container spacing={4} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/*
                    {cards.map((card) => (
                        <div style={{ padding: 5 }}>
                            <LocationCard width={310} height={175} />
                        </div>
                    ))}
                    */}
                </Grid>
                <Grid style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                    <Button> LOAD MORE </Button>
                </Grid >
            </Grid>
        </Container >
    )
}

export default Profile
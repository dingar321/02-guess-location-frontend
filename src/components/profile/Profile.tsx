import { Avatar, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

import ButtonLoad from '../buttons/ButtonLoad'

import GuessCard from '../guess/GuessCard';
import LocationCard from '../locations/LocationCard';

const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const Profile = () => {
    return (
        <Box style={{ marginTop: '2em', marginBottom: '0', height: '100%', }} sx={{ mx: 10 }}>
            <Container style={{ maxWidth: 1600 }}>
                <Box style={{ display: 'flex', flexDirection: 'row' }} sx={{ pb: 7 }}>
                    <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 64, height: 64 }} /> </Typography>
                    <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 34, paddingTop: 8, paddingLeft: 30 }} >Dino Garic</Typography>
                </Box>

                <Box sx={{ pb: 7 }}>
                    <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 24, }} sx={{ pb: 2 }}>My best guesses</Typography>
                    <GuessCard />
                    <Box style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                        <Button style={ButtonLoad}> LOAD MORE </Button>
                    </Box>
                </Box>

                <Box sx={{ pb: 7 }}>
                    <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 24, }} sx={{ pb: 2 }} >My uploaded locations</Typography>
                    <LocationCard />
                    <Box style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                        <Button style={ButtonLoad}> LOAD MORE </Button>
                    </Box>
                </Box>
            </Container>
        </Box >
    )
}

export default Profile
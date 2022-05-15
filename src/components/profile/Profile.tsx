import { Avatar, Box, Container, Typography } from '@mui/material'
import React from 'react'

import GuessCard from '../guess/GuessCard';

const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const Profile = () => {
    return (
        <Box style={{ marginTop: '2em', height: '100%', }} sx={{ mx: 10 }}>
            <Box style={{ display: 'flex', flexDirection: 'row' }} sx={{ pb: 7 }}>
                <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 64, height: 64 }} /> </Typography>
                <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 34, paddingTop: 8, paddingLeft: 30 }} >Dino Garic</Typography>
            </Box>

            <Box sx={{ pb: 7 }}>
                <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 24, }} sx={{ pb: 2 }}>My best guesses</Typography>
                <GuessCard />
            </Box>

            <Box>
                <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 24, }}>My uploads</Typography>
            </Box>
        </Box >
    )
}

export default Profile
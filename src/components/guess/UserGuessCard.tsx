import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Avatar, Box, ButtonBase, Card, CardContent, CardMedia, createMuiTheme, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import { number } from 'yup';
import User from '../../common/models/User';
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

//Images
const GuessFilter = require('../../assets/filters/guess-filter.png') as string;
const GuessPlaceholder = require('../../assets/images/guess-placeholder.png') as string;

/* If the logged user is on the leaderboard add the background color and white text     */


const GuessCard = ({ rank }: { rank: number }) => {

    return (
        <Card style={{ width: 420, height: 50, background: 'white', borderRadius: '4px' }} sx={{}} elevation={0}>
            <Grid container direction="row" style={{ display: 'flex', justifyContent: "flex-start" }}>
                <Grid item style={{ justifyContent: 'center' }} sx={{ py: 1.5, pr: 2, pl: 1 }}>
                    {((rank == 1)) &&
                        <>
                            <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 27, height: 27 }} /> </Typography>
                        </>
                    }
                    {((rank == 2)) &&
                        <>
                            <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 27, height: 27 }} /> </Typography>
                        </>
                    }
                    {((rank == 3)) &&
                        <>
                            <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 27, height: 27 }} /> </Typography>
                        </>
                    }
                    {((rank == 4)) &&
                        <>
                            <Typography> <Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 27, height: 27 }} /> </Typography>
                        </>
                    }
                </Grid>
                <Grid item style={{}} sx={{ py: 0.5, pr: 2 }}>
                    <Typography><Avatar alt={AvatarIcon} src={AvatarIcon} style={{ width: 40, height: 40 }} /> </Typography>
                </Grid>
                <Grid sx={{ py: 0.5 }}>
                    <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 16 }} >Krishna Barbe</Typography>
                    <Typography style={{ color: '#233D4D', fontWeight: 400, fontSize: 12 }} >4. 5. 2021</Typography>
                </Grid>
                <Grid style={{}} sx={{ pl: 17, py: 1.7, }}>
                    <Typography style={{ color: '#619B8A', fontWeight: 400, fontSize: 16 }}>
                        4352 m
                    </Typography>
                </Grid>
            </Grid>
        </Card >
    );
}

export default GuessCard
import { Box, Button, Container, Grid, Hidden, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import User from '../../common/models/User';
import ButtonLoad from '../buttons/ButtonLoad'

import ButtonMd from '../buttons/ButtonMd';
import GuessCard from '../guess/GuessCard';
import LocationCard from '../locations/LocationCard';

const WorldMap = require('../../assets/images/world-map.png') as string;
const WorldMapFull = require('../../assets/images/world-map-full.png') as string;

const Home = () => {

    //If user exists
    const [user, setUser] = useState<User>();
    const [userLogged, setUserLogged] = useState<boolean>(false);

    const cards = [1, 2, 3];
    const cardslocations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (!userLogged) {
        {/* If NOT logged in  */ }
        return (
            <Container style={{ maxWidth: 1600 }} sx={{ my: '8em' }}>
                <Hidden lgDown>
                    {/* Browser view */}
                    <Grid container spacing={2} style={{ background: 'white' }}>
                        <Grid container item xs={6} direction="column" style={{ background: 'white' }}>
                            <Typography style={{ fontWeight: 500, fontSize: '61px', lineHeight: '70px', color: '#619B8A' }} sx={{ pb: 2 }}>
                                Explore the <br /> world with <br /> Geotagger!
                            </Typography>
                            <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} sx={{ pb: 2 }}>
                                Geotagger is website that allows you to post picture and <br /> tag it on the map. Other user than try to locate it via Google Maps.
                            </Typography>
                            <Button style={ButtonMd}>SIGN UP</Button>
                        </Grid>
                        <Grid container item xs={6} direction="column" style={{ background: 'white' }}>
                            world map
                        </Grid>
                    </Grid>

                    <Grid sx={{ mt: 35 }}>
                        {/* Under the greeting */}
                        <Box style={{ textAlign: 'center' }}>
                            <Typography style={{ fontWeight: 400, fontSize: '34px', color: '#619B8A' }} >
                                Try your geographical knowlege at Geotagger!
                            </Typography>
                        </Box>
                        <Box style={{ textAlign: 'center' }} sx={{ pb: 8 }}>
                            <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} >
                                Try to guess the location of the pictures by selecting a position on the map. When you  <br /> guess it, it gives you the error distance.
                            </Typography>
                        </Box>
                        <Grid container spacing={3} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {cards.map((card) => (
                                <div style={{ padding: 5 }}>
                                    <LocationCard width={420} height={235} />
                                </div>
                            ))}
                        </Grid>
                        <Grid style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                            <Button style={ButtonLoad}> LOAD MORE </Button>
                        </Grid >
                    </Grid>
                </Hidden>
                <Hidden lgUp>
                    {/* Phone view */}
                    <Container style={{ textAlign: 'center' }}>

                        <Typography style={{ fontWeight: 400, fontSize: '34px', lineHeight: '40px', color: '#619B8A' }} sx={{ pb: 2 }}>
                            Explore the world with <br /> Geotagger!
                        </Typography>
                        <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} sx={{ pb: 2 }}>
                            Geotagger is website that allows you to post picture and <br /> tag it on the map. Other user than try to locate it via Google Maps.
                        </Typography>
                        <Button style={ButtonMd}>SIGN UP</Button>

                        <Grid sx={{ py: 11 }}>
                            <img src={WorldMapFull} style={{ width: '100%' }} />
                        </Grid>

                        <Typography style={{ fontWeight: 400, fontSize: '34px', lineHeight: '40px', color: '#619B8A' }} sx={{ pb: 2 }}>
                            Try your geographical knowlege at Geotagger!
                        </Typography>
                        <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} sx={{ pb: 2 }}>
                            Try to guess the location of the pictures by selecting a position on the map. When you  <br /> guess it, it gives you the error distance.
                        </Typography>

                        <Grid container spacing={1} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}>
                            {cards.map((card) => (
                                <div style={{ paddingTop: 25, padding: 10 }}>
                                    <LocationCard width={420} height={235} />
                                </div>
                            ))}
                        </Grid>
                        <Grid style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                            <Button style={ButtonLoad}> LOAD MORE </Button>
                        </Grid >

                    </Container>
                </Hidden>
            </Container >
        )
    } else {
        {/* If logged in  */ }
        return (
            <Container style={{ maxWidth: 1600 }} sx={{ my: '5em' }}>
                {/* Browser view */}
                <Grid>
                    <Hidden lgDown >
                        <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 34, }} sx={{ pb: 1 }}>
                            Personal best guesses
                        </Typography>
                        <Typography style={{ color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 16, }} sx={{ pb: 5 }}>
                            Your personal best guesses appear here. Go on and try to beat your personal records or set a new one!
                        </Typography>
                    </Hidden>
                    <Hidden lgUp>
                        {/* Phone view */}
                        <Grid style={{ textAlign: 'center' }}>
                            <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 34, }} sx={{ pb: 1 }}>
                                Personal best guesses
                            </Typography>
                            <Typography style={{ color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 16, }} sx={{ pb: 5 }}>
                                Your personal best guesses appear here. <br /> Go on and try to beat your personal records or set a new one!
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid container spacing={3} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {cards.map((card) => (
                            <div style={{ padding: 5 }}>
                                <GuessCard width={420} height={235} />
                            </div>
                        ))}
                    </Grid>
                    <Grid style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                        <Button style={ButtonLoad}> LOAD MORE </Button>
                    </Grid >
                </Grid>

                {/* sad */}
                <Grid>
                    <Hidden lgDown >
                        <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 34, }} sx={{ pb: 1, pt: 4 }}>
                            New locations
                        </Typography>
                        <Typography style={{ color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 16, }} sx={{ pb: 5 }}>
                            New uploads from users. Try to guess all the locations by pressing on a picture.
                        </Typography>
                    </Hidden>
                    <Hidden lgUp>
                        {/* Phone view */}
                        <Grid style={{ textAlign: 'center' }}>
                            <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 34, }} sx={{ pb: 1, pt: 4 }}>
                                New locations
                            </Typography>
                            <Typography style={{ color: '#233D4D', background: 'white', fontWeight: 400, fontSize: 16, }} sx={{ pb: 5 }}>
                                New uploads from users. <br />Try to guess all the locations by pressing on a picture.
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid container spacing={3} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {cardslocations.map((cardslocations) => (
                            <div style={{ padding: 5 }}>
                                <LocationCard width={420} height={235} />
                            </div>
                        ))}
                    </Grid>
                    <Grid style={{ textAlign: 'center' }} sx={{ pt: 4 }}>
                        <Button style={ButtonLoad}> LOAD MORE </Button>
                    </Grid >
                </Grid >


            </Container >
        )
    }

}

export default Home
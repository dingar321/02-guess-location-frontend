import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import React from 'react'

import GuessCard from '../cards/GuessCard';
import LocationCard from '../cards/LocationCard';


const LoggedIn = () => {

    const cards = [1, 2, 3];
    const cardslocations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
                    <Button> LOAD MORE </Button>
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
                    <Button> LOAD MORE </Button>
                </Grid >
            </Grid >


        </Container >
    )
}

export default LoggedIn
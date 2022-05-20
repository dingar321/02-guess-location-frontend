import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import React from 'react'

import LocationCard from '../cards/LocationCard'

const rightSideMap = require('../assets/images/RightSideMap.png') as string;
const worldMapFull = require('../assets/images/WorldMapFull.png') as string;

const Guest = () => {

    const cards = [1, 2, 3];

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
                        <Button>SIGN UP</Button>

                    </Grid>
                    <Grid container item xs={6} direction="column" style={{ background: 'white' }}>

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
                        <Button> LOAD MORE </Button>
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
                    <Button>SIGN UP</Button>

                    <Grid sx={{ py: 11 }}>
                        <img src={worldMapFull} style={{ width: '100%' }} />
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
                        <Button> LOAD MORE </Button>
                    </Grid >

                </Container>
            </Hidden>
        </Container >
    )
}

export default Guest
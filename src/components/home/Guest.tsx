import { Box, Container, Grid, Hidden, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ContainedButton from '../buttons/ContainedButton';
import LocationCard from '../cards/LocationCard'
import { MostRecentLocationsHome, UserState } from '../../utils/common/RecoilStates';
import User from '../../utils/types/User';
import { useRecoilState } from 'recoil'
import { useEffect } from 'react';
import Location from '../../utils/types/Location';
import axios from 'axios';
import ErrorIcon from '@mui/icons-material/Error';

const backgroundWorldMap = require('../../assets/images/BackgroundWorldMap.gif') as string;

const Guest = () => {

    //Getting and saving the user to a global state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //saving the locked locations
    const [mostRecentLocations, setMostRecentLocations] = useRecoilState<Location[]>(MostRecentLocationsHome);

    //navigation between pages
    const navigate = useNavigate();

    useEffect(() => {
        //First we get the most recent locations
        const fetchMostRecentLocations = async () => {
            const response = await axios.get('http://localhost:3333/location/list?limit=3');
            setMostRecentLocations(response.data);
        }
        fetchMostRecentLocations();
    }, [])

    useEffect(() => {
    }, [loggedUser, mostRecentLocations])

    return (
        <Container style={{ maxWidth: 1600 }}>
            <Hidden lgDown>
                {/* Browser */}
                <Grid style={{ textAlign: 'center', position: 'relative', float: 'left', top: 0, left: 0, width: '100%', minHeight: '700px' }}>
                    <img src={backgroundWorldMap} style={{ right: 0, width: '1142px', height: '643px', position: 'absolute' }} />
                    <Grid style={{ position: 'absolute' }} sx={{ mt: 20 }}>
                        <Typography style={{ fontWeight: 500, fontSize: '61px', lineHeight: '70px', color: '#619B8A', position: 'absolute' }} sx={{ mt: 0 }}>
                            Explore the <br /> world with <br /> Geotagger!
                        </Typography>
                        <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} sx={{ mt: 30 }}>
                            Geotagger is website that allows you to post picture and <br /> tag it on the map. Other user than try to locate it via Google <br /> Maps.
                        </Typography>
                        <ContainedButton type='button' buttonText='SIGN IN' width={137} height={40} background="#619B8A" color="#FFFFFF"
                            fontSize={16} fontWeight={400} onClick={(e: any) => navigate('/signin')} sx={{ mt: 4 }} />
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden lgUp>
                {/* Device */}
                <Grid style={{ textAlign: 'center', position: 'relative', float: 'left', top: 0, left: 0, width: '100%', minHeight: '500px', paddingTop: 48 }}>
                    <Typography style={{ fontWeight: 400, fontSize: '34px', lineHeight: '40px', color: '#619B8A' }} sx={{ pb: 2 }}>
                        Explore the world with <br /> Geotagger!
                    </Typography>
                    <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} sx={{ pb: 2 }}>
                        Geotagger is website that allows you to post picture and <br /> tag it on the map. Other user than try to locate it via Google Maps.
                    </Typography>
                    <ContainedButton type='button' buttonText='SIGN IN' width={137} height={40} background="#619B8A" color="#FFFFFF"
                        fontSize={16} fontWeight={400} onClick={(e: any) => navigate('/signin')} sx={{ mb: 2 }} />
                    <Grid sx={{ py: 1.5 }}>
                        <img src={backgroundWorldMap} style={{ width: '100%' }} />
                    </Grid>
                </Grid>
            </Hidden>
            <Grid sx={{ mt: 2 }}>
                {/* Under the greeting */}
                <Box style={{ textAlign: 'center' }}>
                    <Typography style={{ fontWeight: 400, fontSize: '34px', color: '#619B8A' }} >
                        Try yourself at Geotagger!
                    </Typography>
                </Box>
                <Box style={{ textAlign: 'center' }} sx={{ pb: 8 }}>
                    <Hidden lgDown>
                        <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} >
                            Try to guess the location of the pictures byselecting a position on the map. <br /> When you guess it, it gives you the error distance.
                        </Typography>
                    </Hidden>
                    <Hidden lgUp>
                        <Typography style={{ fontWeight: 400, fontSize: '16px', color: '#233D4D' }} >
                            Try to guess the location of the pictures by <br /> selecting a position on the map. <br /> When you guess it, it gives you the error distance.
                        </Typography>
                    </Hidden>
                </Box>
                <Grid container spacing={mostRecentLocations.length} style={{ background: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {mostRecentLocations.map(location => (
                        <div style={{ padding: 5 }} key={location.locationId}>
                            <LocationCard width={420} height={240}
                                locationObject={location} />
                        </div>
                    ))}
                    {(mostRecentLocations.length === 0) &&
                        <Typography style={{ color: '#619B8A', background: 'white', fontWeight: 400, fontSize: 13, textAlign: 'center' }}   >
                            <ErrorIcon /><br />
                            There are currenty no posts available...
                        </Typography>
                    }
                </Grid>
                <Grid style={{ textAlign: 'center' }} sx={{ pt: 4, mb: 6 }}>
                    <ContainedButton type='button' buttonText='SIGN IN' width={137} height={40} background="#619B8A" color="#FFFFFF"
                        fontSize={16} fontWeight={400} onClick={(e: any) => navigate('/signin')} sx={{ mb: 2 }} />
                </Grid >
            </Grid>
        </Container>
    )
}

export default Guest
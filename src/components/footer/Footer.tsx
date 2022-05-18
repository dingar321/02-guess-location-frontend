import { Box, Container, Hidden, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FooterLogo = require('../../assets/images/footer-logo.png') as string;
const FooterSmLogo = require('../../assets/images/footer-sm-logo.png') as string;

const Footer = () => {

    const location = useLocation();
    useEffect(() => {

    }, [])

    if (location.pathname !== '/signup' && location.pathname !== '/signin') {
        return (
            <footer style={{ height: '60px', background: '#619B8A' }}>
                <Hidden smDown>
                    {/* Footer: > 600px */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', my: 2.5, mx: 10 }}>
                        <Typography> <img src={FooterLogo} /> </Typography>
                        <Typography sx={{ color: 'white', fontSize: 16 }}>All Rights Reserved | skillupmentor.com</Typography>
                    </Box>
                </Hidden>
                <Hidden smUp>
                    {/* Footer: < 600px */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', my: 2.5, mx: 6 }}>
                        <Typography style={{}}> <img src={FooterSmLogo} /> </Typography>
                        <Typography sx={{ color: 'white', fontSize: 12 }}>All Rights Reserved | skillupmentor.com</Typography>
                    </Box>
                </Hidden>
            </footer>
        )
    } else {
        return null;
    }
}

export default Footer;

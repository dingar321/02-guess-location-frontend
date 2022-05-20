import { Box, Container, Hidden, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const footerLogo = require('../../../assets/images/FooterLogo.png') as string;
const footerSmLogo = require('../../../assets/images/FooterSmallLogo.png') as string;

const Footer = () => {
    return (
        <footer style={{ height: '60px', background: '#619B8A' }}>
            <Hidden smDown>
                {/* Browser footer */}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', my: 2.5, mx: 10 }}>
                    <Typography> <img src={footerLogo} /> </Typography>
                    <Typography sx={{ color: 'white', fontSize: 16 }}>All Rights Reserved | skillupmentor.com</Typography>
                </Box>
            </Hidden>
            <Hidden smUp>
                {/* Phone footer */}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', my: 2.5, mx: 6 }}>
                    <Typography> <img src={footerSmLogo} /> </Typography>
                    <Typography sx={{ color: 'white', fontSize: 12 }}>All Rights Reserved | skillupmentor.com</Typography>
                </Box>
            </Hidden>
        </footer>
    )
}

export default Footer;

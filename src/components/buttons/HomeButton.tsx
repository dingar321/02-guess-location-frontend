import { IconButton, Typography } from '@mui/material'
import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const HomeButton = ({ onClick, sx }:
    { onClick: any, sx: any }) => {
    return (
        <IconButton onClick={onClick}
            style={{
                color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                justifyContent: 'space-between', marginBottom: '30px', marginTop: '10px'
            }}>
            <Typography sx={{ fontSize: '24px' }} > Home </Typography>
            <ChevronRightIcon sx={{ fontSize: 35 }} />
        </IconButton>
    )
}

export default HomeButton
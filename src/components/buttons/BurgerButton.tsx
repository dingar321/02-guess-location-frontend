import { IconButton, Typography } from '@mui/material'
import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BurgerButton = ({ onClick, sx, buttonText, color }:
    { onClick: any, sx: any, buttonText: string, color: string }) => {
    return (
        <IconButton onClick={onClick}
            style={{
                color: color, background: 'white', borderRadius: '4px', width: '400px', height: '40px',
                justifyContent: 'space-between', marginBottom: '10px', marginTop: '10px'
            }}>
            <Typography sx={{ fontSize: '24px' }} > {buttonText} </Typography>
            <ChevronRightIcon sx={{ fontSize: 35 }} />
        </IconButton>
    )
}

export default BurgerButton